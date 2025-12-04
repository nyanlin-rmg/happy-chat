import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { app, httpServer } from "../lib/socket.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 500,
    message: 'Too many requests from this IP, please try again after 1 minutes'
});
app.use(limiter);
app.use(cookieParser());

app.use('/public/profilePic', e.static('src/public/upload/profilePic'));
app.use('/public/image', e.static('src/public/upload/image'));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV==="dev") {
    app.use(e.static(path.join(__dirname, "../frontend/dist")));

    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}

httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    connectDB();
});