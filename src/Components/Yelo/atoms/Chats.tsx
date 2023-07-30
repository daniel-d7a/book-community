import { useQuery } from "@tanstack/react-query";
import ChatBox from "./ChatBox";
import { getUserChats } from "../../../Firebase/api/database/ChatsApi";
import { auth } from "../../../Firebase/api/auth/auth";
import { useState } from "react";
import ChatRoom from "./ChatRoom";

export default function Chats() {
  const [chatID, setChatID] = useState("");
  const [roomVisible, setRoomVisible] = useState(true);
  const { data, status } = useQuery({
    queryKey: ["chats"],
    queryFn: getUserChats,
  });
  return (
    <div className="flex  pt-16 h-screen">
      <div className="h-full lg:w-1/4 w-full p-4 flex flex-col gap-4 bg-slate-900 lg:overflow-y-scroll overflow-y-hidden overflow-x-scroll lg:overflow-x-hidden">
        {data?.map((chat) => (
          <div key={chat.id} onClick={() => {
            setChatID(chat.id)
            setRoomVisible(true)
            }}>
            <ChatBox
              userId={chat.u1 === auth.currentUser?.uid ? chat.u2 : chat.u1}
              chatID={chat.id}
            />
          </div>
        ))}
      </div>
      {roomVisible && <ChatRoom key={chatID} chatID={chatID} onRemove={()=>setRoomVisible(false)} />}
    </div>
  );
}
