import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    contacts: [],
    chatContacts: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === true,
    mockMessages: {_id: "Progress...", messages: []},

    toggleSound: () => {
        localStorage.setItem('isSoundEnabled', !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (user) => set({selectedUser: user}),

    getAllContacts: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get('/messages/contacts');
            set({contacts: res.data.data.users});
        } catch (error) {
            console.log("Error in useChatStore: getAllContacts function: ", error);
            toast.error(error.response.data.errors[0].msg);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMyChatPartners: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get('/messages/chats');
            set({chatContacts:  res.data.data.users});
        } catch (error) {
            console.log("Error in useChatStore: getAllContacts function: ", error);
            toast.error(error.response.data.errors[0].msg);
        } finally {
            set({isUsersLoading: false});
        }
    },

    setChatContentOrder: (receivedUser, message) => {
        const chatContacts = get().chatContacts.filter(contact => contact.user._id !== receivedUser._id);
        set({chatContacts: [{user: receivedUser, message}, ...chatContacts]});
    },

    getMessageByUserId: async (userId) => {
        set({isMessageLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/get-messages/${userId}`);
            set({messages: res.data.data.messages});

        } catch (error) {
            console.log("Error in useChatStore: getAllContacts function: ", error);                        
        } finally {
            set({isMessageLoading: false});
        }
    },

    sendMessage: async (messageData, receiver) => {
        const { authUser } = useAuthStore.getState();
        const messages = get().messages;

        const formData = new FormData();
        formData.append('text', messageData.text);
        formData.append('image', messageData.imageFile);

        const inputMessage = {
            _id: Date.now(),
            senderId: authUser._id,
            receiverId: receiver._id,
            text: messageData.text,
            image: messageData.imagePreview,
            status: 'sending'
        }

        set({mockMessages: {...get().mockMessages, messages: [...get().mockMessages.messages, inputMessage]}});
        
        let messagesToSet = messages.filter(message => message._id !== 'Progress...');
        set({messages: [...messagesToSet, get().mockMessages]});

        try {
            const res = await axiosInstance.post(`messages/send/${receiver._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const resMessage = {...res.data.data.message, senderId: res.data.data.message.senderId._id};
            const recentMessages = get().messages.filter(message => message._id === 'Just Now')[0];
            const messagesAfterRes = get().messages.filter(message => message._id !== 'Progress...' && message._id !== 'Just Now');
            const messageToPush = recentMessages ? { _id: 'Just Now', 
                messages: [...recentMessages.messages, resMessage]
            } : { _id: 'Just Now', messages: [resMessage] };

            set({ messages: [...messagesAfterRes, messageToPush]});
            get().setChatContentOrder(receiver, resMessage);

        } catch (error) {
            console.log("error in sendMessage function => useChatStore: ", error);
            toast.error(error.message);
            set({messages: messages});
        } finally {
            set({mockMessages: {_id: "Progress...", messages: []}});
        }
    },

    toUpdateChatList: () => {
        const socket = useAuthStore.getState().socket;
        socket.on('newMessageToChatList', newMessage => {
            const filterChatContacts = get().chatContacts.filter(contact => contact.user._id !== newMessage.senderId._id);
            set({chatContacts: [{user: newMessage.senderId, message: newMessage}, ...filterChatContacts]})
        });
    },

    closeToUpdateChatList: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessageToChatList');
    },

    subscribeToMessages: (user) => {
        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', newMessage => {      
            if (user._id !== newMessage.resData.senderId._id) return;
            const newMessageToChange = {...newMessage.resData, senderId: newMessage.resData.senderId._id};            
            const recentMessages = get().messages.filter(message => message._id === 'Just Now')[0];
            const messagesAfterRes = get().messages.filter(message => message._id !== 'Progress...' && message._id !== 'Just Now');
            const messageToPush = recentMessages ? { _id: 'Just Now', 
                messages: [...recentMessages.messages, newMessageToChange]
            } : { _id: 'Just Now', messages: [newMessageToChange] };
            set({ messages: [...messagesAfterRes, messageToPush]})
        });
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    }
}));