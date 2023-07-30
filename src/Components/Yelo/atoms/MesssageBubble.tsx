import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../Firebase/api/database/UserApi";
import getDate from "../../../Helper/DateFormatter";
import { useState } from "react";
import { auth } from "../../../Firebase/api/auth/auth";

export default function MessageBubble({message}:{message:any}) {
    const [details, setDetails] = useState(false)
    const { data:userData, isSuccess } = useQuery({
        queryKey: ["getUserWithId", message.sender_id],
        queryFn: () => getUserById(message.sender_id),
      });
    return(<div className="w-full">
        <div className={`chat ${message.sender_id === auth.currentUser?.uid?"chat-end":"chat-start"} my-1`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
            className="cursor-pointer"
              src={
                userData?.profile_photo
                  ? userData?.profile_photo
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
            />
          </div>
        </div>
        
        <div
            onClick={()=>setDetails(!details)}
          className={`px-4 py-2 rounded-tl-xl max-w-lg rounded-tr-xl ${message.sender_id === auth.currentUser?.uid?"rounded-bl-xl":"rounded-br-xl"} ${
            "bg-yellow-500"
          } text-white text-sm`}
        >
          {message.text}
        </div>
        <div className={`chat-footer mt-2 text-xs flex ${!details && "hidden"}`}>
          <p className="cursor-pointer">{userData?.username}</p>
          <time className="text-xs opacity-50 ml-2">
            {getDate(message.sent_at)}
          </time>
        </div>
      </div>
    </div>)
}