"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Socket_1 = __importDefault(require("./components/socket/Socket"));
function Home() {
    return (<>
      {/* <h1>Socket.IO Client</h1>
        <button className="btn">Socket.Io</button> */}
    
     <Socket_1.default />
    </>);
}
exports.default = Home;
