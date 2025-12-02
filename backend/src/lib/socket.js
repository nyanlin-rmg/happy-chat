import { Server } from "socket.io";
import e from "express";
import http from "http";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import cookieParser from "socket.io-cookie-parser";
import bodyParser from "body-parser";

const app = e();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true
    }
});

io.use(cookieParser());
io.use(socketAuthMiddleware);

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.user.name);
    const activeUserId = socket.activeUserId;

    userSocketMap[activeUserId] = socket.id;

    io.emit("getActiveUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.user.name);
        delete userSocketMap[activeUserId];
        io.emit("getActiveUsers", Object.keys(userSocketMap));
    })
});

const getReceiverSocketId = (userId) => userSocketMap[userId];

export { io, app, httpServer, getReceiverSocketId };