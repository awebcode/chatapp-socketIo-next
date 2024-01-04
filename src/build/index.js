"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const app = express.default();
app.get("/", (_req, res) => {
    res.send({ uptime: process.uptime() });
});
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: "*",
    },
});
let onlineUsers = [];
function addUserToOnlineUsers(socketId, roomName) {
    const findExistingUser = onlineUsers.find((user) => user.room === roomName);
    if (!findExistingUser) {
        onlineUsers.push({ id: socketId, room: roomName });
    }
    console.log(`Socket ${socketId} joined room ${roomName}`);
}
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("joinRoom", (roomName) => {
        socket.join(roomName);
        addUserToOnlineUsers(socket.id, roomName);
        // Store user's socket ID and room name
        console.log(`Socket ${socket.id} joined room ${roomName}`);
    });
    console.log("onlineUsers", onlineUsers);
    socket.on("message", (data) => {
        const { message, roomName } = data;
        console.log("Received message:", message);
        io.to(roomName).emit("message", message);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        onlineUsers = onlineUsers.filter((user) => user.id !== socket.id); // Remove disconnected user from onlineUsers
        console.log("Online users after disconnect:", onlineUsers);
    });
});
server.listen(8000, () => {
    console.log("Running at localhost:8000");
});
