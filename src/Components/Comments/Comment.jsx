import {Fragment, useState } from "react"
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import {BiUpvote,BiDownvote,BiSend, BiCommentDetail,BiShareAlt,BiStar,BiDotsHorizontalRounded,BiBookReader,BiEditAlt} from "react-icons/bi"
import CommentBody from "./CommentBody";
export default function Comment({user, comment,type,commID}) {
    const[upVoted,setUpvoted] = useState(false)
    const[downVoted,setDownvoted] = useState(false)
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return(<div className="w-11/12">
        <CommentBody profile={user.profile} state={user.state} username={user.username} text={comment.text} type={"c"}/>
        <div className="flex flex-col">
            <div className="flex gap-2">
                <p className="flex gap-1 items-center"><BiUpvote className={`${upVoted? "text-teal-500":"text-white"}`} onClick={()=>{}}/> 5 <BiDownvote className={`${downVoted? "text-yellow-500":"text-white"}`} onClick={()=>{}}/></p>
            </div>
            
            <Accordion open={open === 1} className="pl-4">
                <AccordionHeader onClick={() => handleOpen(1)} className="text-xs mb-2 underline">
                {open === 0? `show ${comment.replies.length} replies`:"hide replies"}
                </AccordionHeader>
                <AccordionBody className="flex flex-wrap gap-2">
                    {comment.replies.map(reply => <CommentBody profile={reply.user.profile} state={reply.user.state} username={reply.user.username} text={reply.text} type={"r"}/>)}
                    <div className="w-full flex justify-center">
                    <div className="form-control w-full">
                        <div className="input-group w-full">
                            <textarea placeholder="Add a reply" className="py-3 pl-3 bg-slate-800 overflow-hidden break-words resize-none outline-none border-none w-full h-12" />
                            <button className="btn btn-square border-none bg-yellow-500">
                                <BiSend className="text-2xl text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
                </AccordionBody>
            </Accordion>
        </div>
    </div>)
}