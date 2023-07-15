import { TfiLocationPin } from "react-icons/tfi";
import Comments from "../Comments/Comments";
import { useState } from "react";
import {
  BiUpvote,
  BiDownvote,
  BiCommentDetail,
  BiShareAlt,
  BiStar,
  BiDotsHorizontalRounded,
  BiBookReader,
  BiEditAlt,
} from "react-icons/bi";
export default function Post({ user, post }) {
  const [votes, setVotes] = useState(post.votes);
  const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  function getDate(timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
    const date = new Date(milliseconds); // Create a new Date object from the milliseconds

    const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad it with a leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (Note: January is 0) and pad it with a leading zero if necessary
    const year = date.getFullYear().toString(); // Get the full year

    const formattedDate = `${day}/${month}/${year}`; // Combine the day, month, and year to get the formatted date
    return formattedDate;
  }
  function handleclick(amount) {
    if (!upVoted && !downVoted) {
      if (amount === 1) {
        setUpvoted(true);
      } else if (amount === -1) {
        setDownvoted(true);
      }
      post.votes += amount;
      setVotes(post.votes);
    } else if (upVoted && amount === 1) {
      setUpvoted(false);
      post.votes -= amount;
      setVotes(post.votes);
    } else if (upVoted && amount === -1) {
      setUpvoted(false);
      setDownvoted(true);
      post.votes += 2 * amount;
      setVotes(post.votes);
    } else if (downVoted && amount === -1) {
      setDownvoted(false);
      post.votes -= amount;
      setVotes(post.votes);
    } else if (downVoted && amount === 1) {
      setUpvoted(true);
      setDownvoted(false);
      post.votes += 2 * amount;
      setVotes(post.votes);
    }
  }
  return (
    <>
      <div className="rounded-md pb-4 bg-slate-950 max-w-2xl mx-auto w-fullshadow-xl mb-4">
        <div className="flex gap-4 items-center pt-4 pl-4">
          <div className="relative">
            <img
              src={
                user && user.profile
                  ? user.profile
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              className=" w-12 h-12 rounded-full object-cover"
            />
            <div
              className={`absolute bottom-0 right-0 w-5 h-5 rounded-full ${
                user.state === "r" ? "bg-teal-500" : "bg-yellow-500"
              }  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`}
            >
              {user.state === "r" ? <BiBookReader /> : <BiEditAlt />}
            </div>
          </div>
          <div className="text-sm">
            <a href="#" className="text-lg font-bold">
              {user.username || "user"} {post.community && "/"}{" "}
              <a href="#">
                {post.community && post.community.length > 15
                  ? post.community.substring(0, 15) + "..."
                  : post.community}
              </a>
            </a>
            <div className="flex gap-2 text-xs text-zinc-400">
              <p>{getDate(post.created_at)}</p>
              {post.location && (
                <a href="#" className="flex gap-1 items-center">
                  <TfiLocationPin /> {post.location}
                </a>
              )}
            </div>
          </div>

          <div className="dropdown dropdown-end ml-auto mr-4">
            <label tabIndex={0} className="">
              <BiDotsHorizontalRounded className="text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow rounded-box w-52 bg-slate-950"
            >
              <li>
                <a>Hide</a>
              </li>
              <li>
                <a>Report</a>
              </li>
              <li>
                <a>Copy Link</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pl-4 pt-4">
          <p>{post.text}</p>
        </div>
        {post.image && (
          <figure className="px-4 pt-4">
            <img src={post.image} className="" />
          </figure>
        )}
        <div className="flex gap-4 items-center px-4 py-2">
          <p className="flex gap-2 items-center">
            <BiUpvote
              className={`${upVoted ? "text-teal-500" : "text-white"}`}
              onClick={() => {
                handleclick(1);
              }}
            />{" "}
            <span className="text-sm">{`Votes (${votes})`}</span>{" "}
            <BiDownvote
              className={`${downVoted ? "text-yellow-500" : "text-white"}`}
              onClick={() => {
                handleclick(-1);
              }}
            />
          </p>
          <label
            htmlFor={`comments_${post.id}`}
            className="flex gap-2 items-center"
            onClick={() => (document.body.style.overflow = "hidden")}
          >
            <BiCommentDetail />{" "}
            <span className="text-sm">{`Comments (${post.comment_ids.length})`}</span>
          </label>
          <BiShareAlt />
          <BiStar className="ml-auto" />
        </div>
      </div>
      {/* <Comments comms={post.comments} type="Comments" postID={post.id}/> */}
    </>
  );
}
