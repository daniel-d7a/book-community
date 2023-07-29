import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../Firebase/api/database/UserApi";
import ChatBox from "./ChatBox";

export default function Chats() {
    const { data, status } = useQuery({
        queryKey: ["allUsers"],
        queryFn: getAllUsers,
      });
    return(<div className="h-full w-1/4 p-4 flex flex-col gap-4 bg-slate-900 overflow-y-scroll">
        {data?.map(user => <ChatBox key={user.id} user={user}/>)}
    </div>)
}