import mongoose, { Mongoose } from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js";
import {ObjectId} from "mongodb";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
            const loggedInUserId = req.user._id;
            const filteredUsers = await User.find({_id: {$ne: loggedInUserId}});

            res.status(200).json({
                meta: {
                    id: loggedInUserId,
                    title: 'All Contacts',
                    total: filteredUsers.length
                },
                data: {
                    users: filteredUsers
                }
            });
    } catch (error) {
        console.log('Error in message controller => getAllContacts function: ', error);
        return res.status(500).json({
            message: "Internal Servr Error"
        });

    }
};

export const getChatPartners = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const chatMessages = await Message.find({
            $or: [
                { senderId: currentUser._id },
                { receiverId: currentUser._id}
            ]
        }).sort({_id: -1}).exec();

        const partnerIds = Array.from(new Set(chatMessages.map(message => {
            return message.senderId.equals(currentUser._id) ? message.receiverId.toString() : message.senderId.toString()
        }))).map(objId => new mongoose.Types.ObjectId(objId));

        const partnersWithMessage = await Promise.all(partnerIds.map(async id => {
            const user = await User.findById(id);
            const message = await Message.find({
            $or: [
                    { senderId: currentUser._id, receiverId: user._id },
                    { senderId: user._id, receiverId: currentUser._id },
                ],
            }).sort({createdAt: -1}).limit(1);

            return {
                user, message: message[0]
            }
        }));

        return res.status(200).json({
            meta: {
                    title: 'Chat Partners',
                    total: partnersWithMessage.length
                },
                data: {
                    users: partnersWithMessage
                }
        })
    } catch (error) {
        console.log("Error in Message Controller => getChatPartners function: ", error);
        return res.status(500).json({error: 'Internal Server Error'});        
    }
};

export const getMessageByUserId = async (req, res) => {
    // return res.json({message: 'testing'});
    try {
        const myId = req.user._id;
        const {userId } = req.params;

        const userToChatId = new mongoose.Types.ObjectId(userId);
        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: myId, receiverId: userToChatId },
                        { senderId: userToChatId, receiverId: myId }
                    ]
                }
            },
            {
                $addFields: {
                    imageLink: { $concat: ["http://localhost:8000/public/image/", "$image"]},
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
                    latestCreatedAt: { $max: "$createdAt" },
                    messages: { 
                        $push: '$$ROOT',
                    }
                },
            },
            {
                $sort: { latestCreatedAt: 1 }
            }
        ]);

        return res.json({
            meta: {
                title: 'messages',
                total: messages.length
            },
            data: {
                messages
            }
        });
    } catch (error) {
        console.log("Error in Message Controller => getMessageByUserId function: ", error);
        return res.status(500).json({error: 'Internal Server Error'});        
    }
};

export const sendMessage = async (req, res) => {
    try {
        const text = req.body ? req.body.text : '';
        const { receiverId } = req.params;
        const image = req.file ? req.file.filename : '';

        if (text === '' && image === '') {
            return res.json({message: 'message cannot be empty'});
        }

        if (req.user._id.toString() === receiverId.toString()) {
            throw new Error('you can not send message to your self');
        }

        const newMessage = new Message({
            senderId: req.user._id,
            receiverId,
            text,
            image
        });

        
        const data = await newMessage.save();
        const resData = await data.populate({ path: "senderId", select: "-hash_password -salt"});
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", {resData});
            io.to(receiverSocketId).emit("newMessageToChatList", resData);
        }

        return res.status(201).json({meta: {title: 'send message'}, data: {message: resData}})
    } catch(error) {
        console.log("Error in Message Controller => sendMessage function: ", error);
        return res.status(500).json({error: 'Internal Server Error'});        
    }
};

export const getLatestMessage = async (req, res) => {
    const currentUserId = req.user._id;
    const { partnerId } = req.params;

    const userToChatId = new mongoose.Types.ObjectId(partnerId);

    try {
        const message = await Message.find({
        $or: [
                { senderId: currentUserId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: currentUserId },
            ],
        }).sort({createdAt: -1}).limit(1);

        return res.json({
            meta: {
                title: "get latest message with ",
            },
            data: {
                message
            }
        });

    } catch (error) {
        console.log("Error in Message Controller => getMessageByUserId function: ", error);
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}