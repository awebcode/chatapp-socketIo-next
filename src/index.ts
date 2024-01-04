import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";

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
let onlineUsers: any = [];
function addUserToOnlineUsers(socketId: string, roomName: string) {
  const findExistingUser = onlineUsers.find((user: any) => user.room === roomName);

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
  socket.on("message", (data: any) => {
    const { message, roomName } = data;
    console.log("Received message:", message);
    io.to(roomName).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    onlineUsers = onlineUsers.filter((user: any) => user.id !== socket.id); // Remove disconnected user from onlineUsers
    console.log("Online users after disconnect:", onlineUsers);
  });
});

server.listen(8000, () => {
  console.log("Running at localhost:8000");
});
