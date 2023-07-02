import {TfiLocationPin} from "react-icons/tfi"
import Comments from "../Comments/Comments"
import { useState } from "react"
import {BiUpvote,BiDownvote, BiCommentDetail,BiShareAlt,BiStar,BiDotsHorizontalRounded,BiBookReader,BiEditAlt} from "react-icons/bi"
export default function Post({user, post}) {
    const[votes, setVotes] = useState(post.votes)
    const[upVoted,setUpvoted] = useState(false)
    const[downVoted,setDownvoted] = useState(false)
    function handleclick(amount){
        if(!upVoted && !downVoted){
            if (amount===1){
                setUpvoted(true)
            } else if(amount === -1){
                setDownvoted(true)
                
            }
            post.setVotes(amount)
            setVotes(post.votes)
        } else if(upVoted && amount ===1){
            setUpvoted(false)
            post.setVotes(-amount)
            setVotes(post.votes)
        } else if(upVoted && amount === -1){
            setUpvoted(false)
            setDownvoted(true)
            post.setVotes(2*amount)
            setVotes(post.votes)
        } else if(downVoted && amount === -1){
            setDownvoted(false)
            post.setVotes(-amount)
            setVotes(post.votes)
        } else if(downVoted && amount === 1){
            setUpvoted(true)
            setDownvoted(false)
            post.setVotes(2*amount)
            setVotes(post.votes)
        }
        
    }
    return(<>
        <div className="card max-w-2xl mx-auto w-full bg-base-100 shadow-xl mb-2">
        <div className="flex gap-4 items-center pt-4 pl-4">
            <div className="relative">
                <img src={user.profile} alt="Shoes" className=" w-12 h-12 rounded-full object-cover" />
                <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full ${user.state ==="r"? "bg-teal-500": "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`}>
                    {user.state === "r"? <BiBookReader/> : <BiEditAlt/>}
                </div>
            </div>
            <div className="text-sm">
                <a href="#">{user.username || "user"} / <a href="#">{post.community.length > 15? post.community.substring(0,15) + '...' : post.community}</a></a>
                <div className="flex gap-2 text-xs text-zinc-400">
                    <p>{post.date} minutes ago</p>
                    <a href="#" className="flex gap-1 items-center"><TfiLocationPin/> {post.location}</a>
                </div>
            </div>
            
            <div className="dropdown dropdown-end ml-auto mr-4">
                <label tabIndex={0} className="">
                    <BiDotsHorizontalRounded className="text-2xl"/>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    <li><a>Hide</a></li>
                    <li><a>Report</a></li>
                    <li><a>Copy Link</a></li>
                </ul>
            </div>
        </div>
        <div className="pl-4 pt-4">
            <p>{post.text}</p>
        </div>
        <figure className="px-4 pt-4">
            <img src={post.image} className="" />
        </figure>
        <div className="flex gap-4 items-center px-4 py-2">
            <p className="flex gap-2 items-center"><BiUpvote className={`${upVoted? "text-teal-500":"text-white"}`} onClick={()=>{handleclick(1)}}/> {votes} <BiDownvote className={`${downVoted? "text-yellow-500":"text-white"}`} onClick={()=>{handleclick(-1)}}/></p>
            <label htmlFor={`comments_${post.id}`} className="flex gap-2 items-center" onClick={()=>document.body.style.overflow = 'hidden'}><BiCommentDetail/> {post.comments.length}</label>
            <BiShareAlt/>
            <BiStar className="ml-auto"/>
        </div>
        </div>
        <Comments comms={post.comments} type="Comments" postID={post.id}/>
    </>)
}