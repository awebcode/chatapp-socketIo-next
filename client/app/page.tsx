import Image from 'next/image'
import WebSocketComponent from './components/socket/Socket'

export default function Home() {
  return (
    <>
      {/* <h1>Socket.IO Client</h1>
      <button className="btn">Socket.Io</button> */}
    
     <WebSocketComponent/>
    </>
  )
}
