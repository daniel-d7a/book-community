import { useState } from "react";
import { ApiReply } from "../../Types/Replies";
import getDate from "../../Helper/DateFormatter";
import { BiDownvote, BiUpvote } from "react-icons/bi";

export default function ReplyContentBody({
    reply,
  }: {
    reply: ApiReply;
  }) {
    const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
      <div className="chat chat-end my-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                reply.user_data?.profile_photo
                  ? reply.user_data?.profile_photo
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
            />
          </div>
        </div>
        <div className="chat-header mb-2 text-xs">
          {reply.user_data.username}
          <time className="text-xs opacity-50 ml-2">
            {getDate(reply.created_at)}
          </time>
        </div>
        <div
          className={`px-4 py-2 rounded-tl-xl rounded-bl-xl rounded-br-xl ${
            reply.user_data.type === "r" ? "bg-blue-600" : "bg-yellow-500"
          } text-white text-sm`}
        >
          {reply.text.length < 200? reply.text : 
          <>
            {showMore? reply.text :reply.text.slice(0,200)}
            <span className="ml-2 cursor-pointer text-sm underline" onClick={()=>setShowMore(!showMore)}>{showMore?"show less":"show more"}</span>
          </>}
        </div>
      </div>
      <div className="flex justify-end gap-4 items-center px-4 py-2 mr-8">
        <p className="flex gap-2 items-center">
          <BiUpvote
            className={`${upVoted ? "text-teal-500" : "text-white"}`}
            onClick={() => {
              handleclick(1);
            }}
          />{" "}
          <span className="text-sm">{`0`}</span>{" "}
          <BiDownvote
            className={`${downVoted ? "text-yellow-500" : "text-white"}`}
            onClick={() => {
              handleclick(-1);
            }}
          />
        </p>
      </div>
    </div>
  );
}