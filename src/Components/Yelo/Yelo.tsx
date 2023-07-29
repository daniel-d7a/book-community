import Nav from "../Nav/Nav";
import ChatRoom from "./atoms/ChatRoom";
import Chats from "./atoms/Chats";

export default function Yelo() {
    return(<>
        <Nav/>
        <div className="flex pt-16 h-screen">
            <Chats/>
            <ChatRoom/>
        </div>
    </>)
}