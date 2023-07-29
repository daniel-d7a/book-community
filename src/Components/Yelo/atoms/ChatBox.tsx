import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../Firebase/api/database/UserApi";

export default function ChatBox({userId}:{userId:any}) {
    console.log(userId)
    const { data:user, isSuccess } = useQuery({
        queryKey: ["getChatUserID", userId],
        queryFn: () => getUserById(userId),
      });
    
    return(<div className="w-full flex items-center gap-4 cursor-pointer">
        <img
            src={
                user && user.profile_photo
                ? user.profile_photo
                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            className=" w-10 h-10 rounded-full object-cover cursor-pointer"
            />
        <div className="flex flex-col ">
            <p className="font-bold text-sm">{isSuccess && user.username}</p>
            <p className="text-xs">Temp message</p>
        </div>
    </div>)
}