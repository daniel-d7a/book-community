import { useState } from "react";
import { BiCommentDetail, BiDownvote, BiUpvote } from "react-icons/bi";
import { ApiComment } from "../../Types/Comments";
import getDate from "../../Helper/DateFormatter";
import RepliesContent from "./RepliesContent";
import { useNavigate } from "react-router-dom";

export default function CommentContentBody({
  comment,
}: {
  comment: ApiComment;
}) {
  const [displayReplies, setDisplayReplies] = useState(false)
  const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate()
  function handleclick(amount: number) {
    if (!upVoted && !downVoted) {
      if (amount === 1) {
        setUpvoted(true);
      } else if (amount === -1) {
        setDownvoted(true);
      }
    } else if (upVoted && amount === 1) {
      setUpvoted(false);
    } else if (upVoted && amount === -1) {
      setUpvoted(false);
      setDownvoted(true);
    } else if (downVoted && amount === -1) {
      setDownvoted(false);
    } else if (downVoted && amount === 1) {
      setUpvoted(true);
      setDownvoted(false);
    }
  }
  return (
    <div className="">
      <div className="chat chat-start my-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              onClick={()=>navigate(`/profile/${comment.user_id}`)}
              src={
                comment.user_data?.profile_photo
                  ? comment.user_data?.profile_photo
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="chat-header mb-2 text-sm flex">
          <p className="cursor-pointer" onClick={()=>navigate(`/profile/${comment.user_id}`)}>{comment.user_data.username}</p>
          <time className="text-sm opacity-50 ml-2">
            {getDate(comment.created_at)}
          </time>
        </div>
        <div
          className={`px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-br-xl ${
            comment.user_data.type === "r" ? "bg-blue-600" : "bg-yellow-500"
          } text-white text-sm`}
        >
          {comment.text.length < 200? comment.text : 
          <>
            {showMore? comment.text :comment.text.slice(0,200)}
            <span className="ml-2 cursor-pointer text-sm underline" onClick={()=>setShowMore(!showMore)}>{showMore?"show less":"show more"}</span>
          </>}
        </div>
      </div>
      <div className="flex gap-4 items-center px-4 py-2 ml-8">
        <p className="flex gap-2 items-center">
          <BiUpvote
            className={`${upVoted ? "text-teal-500" : "text-white"}`}
            onClick={() => {
              handleclick(1);
            }}
          />{" "}
          <span className="text-sm">{`${comment.votes}`}</span>{" "}
          <BiDownvote
            className={`${downVoted ? "text-yellow-500" : "text-white"}`}
            onClick={() => {
              handleclick(-1);
            }}
          />
        </p>
        <label
            htmlFor={`replies_${comment.id}`}
            className="flex gap-2 items-center"
            onClick={() => {
              setDisplayReplies(!displayReplies);
            }}
          >
            <BiCommentDetail />{" "}
            <span className="text-sm">{`${comment.reply_ids.length}`}</span>
          </label>
      </div>
      {displayReplies && <RepliesContent commentID={comment.id} />}
    </div>
  );
}
