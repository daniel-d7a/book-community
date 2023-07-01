import { useState } from "react"
import {BiUpvote,BiDownvote, BiCommentDetail,BiShareAlt,BiStar,BiDotsHorizontalRounded,BiBookReader,BiEditAlt} from "react-icons/bi"
export default function Comment({user, text}) {
    const[upVoted,setUpvoted] = useState(false)
    const[downVoted,setDownvoted] = useState(false)
    return(<div className="w-11/12">
        <div className="flex gap-2 rounded-md w-full bg-slate-600 px-2 py-2">
            <div className="relative shrink-0 h-10 w-fit">
                <img src={user.profile} alt="Shoes" className=" w-10 h-10 rounded-full object-cover" />
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${user.state ==="r"? "bg-teal-500": "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center text-[8px]`}>
                    {user.state === "r"? <BiBookReader/> : <BiEditAlt/>}
                </div>
            </div> 
            <div>
            <div className="text-sm font-bold">
                <a href="#">{user.username || "user"} </a>
            </div>
                <div className="text-xs">{text}</div>
            </div>
        </div>
        <p className="flex gap-1 items-center"><BiUpvote className={`${upVoted? "text-teal-500":"text-white"}`} onClick={()=>{}}/> 5 <BiDownvote className={`${downVoted? "text-yellow-500":"text-white"}`} onClick={()=>{}}/></p>
    </div>)
}