"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
let socket:any;

const WebSocketComponent = () => {
  const [message, setMessage] = useState<any>("");
   const [roomName, setroomName] = useState<any>("");
  const [chat, setchat] = useState<any>([]);
  useEffect(() => {
    // Connect to the WebSocket server
    socket= io(process.env.SERVER_PORT!);
    // Event listener for connection established
    socket.on("connect", () => {
      console.log("Connected to server!");
    });

    // Event listener for receiving messages
    socket.on("message", (data:any) => {
      console.log("Received message:", data);
      setchat([...chat, data]);
      // Handle the incoming message data here
    });

    // // Cleanup on component unmount
   
  }, [chat]);
  async function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message !== "") {
      socket.emit("joinRoom", roomName); // Join the specified room
      socket.emit("message", { message, roomName });
      setMessage("");
    }
    //   setchat([...chat, message]);
  }
  return (
    <>
      {" "}
      <div className="container mx-auto px-6 md:px-10 flexCenter flex-col">
        {/* Your React component's content */}
        <div className="mx-auto">
          {" "}
          <h1 className="text-6xl">Messages</h1>
          {chat &&
            chat.map((c: any) => {
              return <li className="py-2 text-2xl text-white">{c}</li>;
            })}
        </div>
        <div className="mx-auto py-6 md:py-10 max-w-screen-2xl   ">
          {" "}
          <form
            onSubmit={submitMessage}
            className="shadow-md  px-4 py-8 flex flex-col"
          >
            <h1 className="text-center">Socket</h1>
            <input
              placeholder="Room Name"
              type="text"
              value={roomName}
              onChange={(e) => setroomName(e.target.value)}
              className="p-3 focus:ring-2 ring-green-500 my-3"
            />
            <input
              placeholder="Message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 focus:ring-2 ring-green-500"
            />
            <button type="submit" className="btn bg-purple-500 my-6">
              Submit Message
            </button>
          </form>
        </div>
        {/* Add your other components here */}
      </div>
    </>
  );
};

export default WebSocketComponent;
