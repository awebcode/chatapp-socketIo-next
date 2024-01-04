"use strict";
"use client";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
let socket;
const WebSocketComponent = () => {
    const [message, setMessage] = (0, react_1.useState)("");
    const [roomName, setroomName] = (0, react_1.useState)("");
    const [chat, setchat] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // Connect to the WebSocket server
        socket = (0, socket_io_client_1.default)(process.env.SERVER_PORT);
        // Event listener for connection established
        socket.on("connect", () => {
            console.log("Connected to server!");
        });
        // Event listener for receiving messages
        socket.on("message", (data) => {
            console.log("Received message:", data);
            setchat([...chat, data]);
            // Handle the incoming message data here
        });
        // // Cleanup on component unmount
    }, [chat]);
    function submitMessage(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (message !== "") {
                socket.emit("joinRoom", roomName); // Join the specified room
                socket.emit("message", { message, roomName });
                setMessage("");
            }
            //   setchat([...chat, message]);
        });
    }
    return (<>
      {" "}
      <div className="container mx-auto px-6 md:px-10 flexCenter flex-col">
        {/* Your React component's content */}
        <div className="mx-auto">
          {" "}
          <h1 className="text-6xl">Messages</h1>
          {chat &&
            chat.map((c) => {
                return <li className="py-2 text-2xl text-white">{c}</li>;
            })}
        </div>
        <div className="mx-auto py-6 md:py-10 max-w-screen-2xl   ">
          {" "}
          <form onSubmit={submitMessage} className="shadow-md  px-4 py-8 flex flex-col">
            <h1 className="text-center">Socket</h1>
            <input placeholder="Room Name" type="text" value={roomName} onChange={(e) => setroomName(e.target.value)} className="p-3 focus:ring-2 ring-green-500 my-3"/>
            <input placeholder="Message" type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="p-3 focus:ring-2 ring-green-500"/>
            <button type="submit" className="btn bg-purple-500 my-6">
              Submit Message
            </button>
          </form>
        </div>
        {/* Add your other components here */}
      </div>
    </>);
};
exports.default = WebSocketComponent;
