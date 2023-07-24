import { useState } from "react";
import { BiCommentDetail, BiDownvote, BiUpvote } from "react-icons/bi";

export default function CommentContentBody({comment}) {
    const[upVoted,setUpvoted] = useState(false)
    const[downVoted,setDownvoted] = useState(false)
    function handleclick(amount:number){
        if(!upVoted && !downVoted){
            if (amount===1){
                setUpvoted(true)
            } else if(amount === -1){
                setDownvoted(true)
            }
        } else if(upVoted && amount ===1){
            setUpvoted(false)
        } else if(upVoted && amount === -1){
            setUpvoted(false)
            setDownvoted(true)
        } else if(downVoted && amount === -1){
            setDownvoted(false)
        } else if(downVoted && amount === 1){
            setUpvoted(true)
            setDownvoted(false)
        }
        
    }
    function getDate(timestamp:any){
        const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
        const date = new Date(milliseconds); // Create a new Date object from the milliseconds

        const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad it with a leading zero if necessary
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0) and pad it with a leading zero if necessary
        const year = date.getFullYear().toString(); // Get the full year

        const formattedDate = `${day}/${month}/${year}`; // Combine the day, month, and year to get the formatted date
        return formattedDate
    }
    return(<div className="">
     <div className="chat chat-start my-2">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img src={comment.user_data.profile_photo?comment.user_data.profile_photo:"https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"} />
            </div>
        </div>
        <div className="chat-header mb-2 text-base">
            {comment.user_data.username}
            <time className="text-sm opacity-50 ml-2">{getDate(comment.created_at)}</time>
        </div>
        <div className={`chat-bubble ${comment.user_data.type === 'r'? "bg-blue-600":"bg-yellow-500"} text-white text-lg`}>{comment.text}</div>
    </div>
    <div className="flex gap-4 items-center px-4 py-2 ml-8">
        <p className="flex gap-2 items-center"><BiUpvote className={`${upVoted? "text-teal-500":"text-white"}`} onClick={()=>{handleclick(1)}}/> <span className="text-sm">{`${comment.votes}`}</span> <BiDownvote className={`${downVoted? "text-yellow-500":"text-white"}`} onClick={()=>{handleclick(-1)}}/></p>
        <label htmlFor={``} className="flex gap-2 items-center"><BiCommentDetail/> <span className="text-sm">{`0`}</span></label>
    </div>
    </div>)
}