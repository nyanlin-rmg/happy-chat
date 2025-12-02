import { axiosInstance } from "./axios"

export const getLatestMessage = async (partnerId) => {
    const res = await axiosInstance.get(`/messages/chats/latest-message/${partnerId}`);
    return res.data.data;
}

export const sendNewMessage = async (messageData, receiverId) => {
    const formData = new FormData();
    formData.append('text', messageData.text);
    formData.append('image', messageData.imageFile);
    const requestOptions = {
        method: "POST",
        credentials: 'include',
        body: formData,
        redirect: "follow"
    };
    return await fetch("http://localhost:8000/api/messages/send/" + receiverId, requestOptions);
}