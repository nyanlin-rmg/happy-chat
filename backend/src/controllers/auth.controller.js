import { response } from 'express';
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';

export const signup = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        return res.status(201)
            .json(
                {
                    meta: {
                        id: user._id
                    },
                    data: {
                        user
                    }
                }
            );
    } catch (e) {
        console.log(e);
        return res.json({e});
    }
    
}

export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            throw new Error('Your email cannot be found!')
        }

        if (user.authenticate(password)) {
            const token = generateToken(user._id, res);
            return res.status(200).json({
                meta: {
                    id: user._id,
                },
                data: {
                    token, user
                }
            });
        } else {
            return res.status(401).json({
                    error: {
                        message: 'Invalid password'
                    }
                })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            error: {
                message: 'Email cannot be found!'
            }
        })
    }
}

export const signout = (_, res) => {
    res.clearCookie('jwt');
    return res.json({
        'message': 'success'
    })
}

export const updateProfile = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findById(req.user._id);
        const profilePicName = req.file ? req.file.filename : user.profilePic;
        user.profilePic = profilePicName;
        const updatedUser = await user.save(
            {profilePic: profilePicName},
            {new: true}
        );

        return res.status(200).json({meta: {id: updatedUser._id}, data: {user:updatedUser}});
    } catch (error) {
        console.log("Error in auth controller => update profile function: ", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}