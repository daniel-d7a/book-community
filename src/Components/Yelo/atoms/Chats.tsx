import { useQuery } from "@tanstack/react-query";
import ChatBox from "./ChatBox";
import { getUserChats } from "../../../Firebase/api/database/ChatsApi";
import { auth } from "../../../Firebase/api/auth/auth";
import { useState } from "react";
import ChatRoom from "./ChatRoom";

export default function Chats() {
    const [chatID, setChatID] = useState("")
    const [messageIDs, setMessageIDs] = useState([])
    const { data, status } = useQuery({
        queryKey: ["chats"],
        queryFn: getUserChats,
      });
      {console.log(chatID)}
    return(<div className="flex lg:flex-row flex-col pt-16 h-screen">
        
        <div className="h-24 lg:h-full lg:w-1/4 w-full p-4 flex lg:flex-col flex-row gap-4 bg-slate-900 lg:overflow-y-scroll overflow-x-scroll">
            {data?.map(chat => <div key={chat.id} onClick={()=>setChatID(chat.id)}><ChatBox userId={chat.u1 === auth.currentUser?.uid?chat.u2:chat.u1}/></div>)}
        </div>
        <ChatRoom key={chatID} chatID={chatID}/>
    </div>)
}