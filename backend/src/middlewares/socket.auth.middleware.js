import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
    const token = socket.request.cookies.jwt;
    if (!token) return;
    if (!token) throw new Error('Invalid Token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) throw new Error('Invalid Token');
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            console.log("Socket connection rejected!: User Not Found");
            throw new Error('User Not Found!');
        }

        socket.user = user;
        socket.activeUserId = user._id.toString();
        next();
    } catch (error) {
        console.log(error);
        return next(new Error('Authentication error: Invalid token'));        
    }
}