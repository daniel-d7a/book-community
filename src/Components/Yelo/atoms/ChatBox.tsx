import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../Firebase/api/database/UserApi";
import { useEffect, useState } from "react";
import { getLatestAddedMessage } from "../../../Firebase/api/database/MessagesApi";
import { any } from "zod";

export default function ChatBox({userId,chatID}:{userId:string, chatID:any}) {
    console.log(chatID)
    const { data:user, isSuccess } = useQuery({
        queryKey: ["getChatUserID", userId],
        queryFn: () => getUserById(userId),
      });

    const [latest, setLatest] = useState({
        text: "loading messages..."
    })
    useEffect(() => {
        let messagesSnapshot!: any;
        (async () => {
          messagesSnapshot = await getLatestAddedMessage(chatID, setLatest);
        })();
    
        return () => messagesSnapshot?.unsubscribe();
      }, []);
    
    return(<div className="w-full flex items-center gap-2 cursor-pointer">
        <img
            src={
                user && user.profile_photo
                ? user.profile_photo
                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            className=" w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-white"
            />
        <div className="flex flex-col items-center lg:items-start w-fit overflow-hidden">
            <p className="font-bold text-sm w-full">{isSuccess? user.username:"loading..."}</p>
            <p className="text-xs overflow-hidden ">{latest.text.length < 50 ?latest.text:latest.text.slice(0,47)+"..." }</p>
        </div>
    </div>)
}