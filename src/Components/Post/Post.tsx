import { TfiLocationPin } from "react-icons/tfi";
import { useEffect, useState } from "react";
import getDate from "../../Helper/DateFormatter";
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
import { SignUpData } from "../../Types/Auth";
import { ApiPost } from "../../Types/Posts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostComments } from "../../Firebase/api/database/CommentsApi";
import CommentsContent from "../Comments/CommentsContent";
import { votePost } from "../../Firebase/api/database/PostsApi";
import { auth } from "../../Firebase/api/auth/auth";

type PostProps = {
  user: SignUpData;
  post: ApiPost;
};

export type Vote = { id: string; vote: "up" | "down" };

export default function Post({ user, post }: PostProps) {
  const [showMore, setShowMore] = useState(false)
  const [displayComms, setDisplayComms] = useState(false);
  const { mutate } = useMutation({
    mutationFn: ({ id, vote }: Vote) => votePost(id, vote),
  });
  const [votes, setVotes] = useState(post.votes);
  const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  useEffect(() => {
    const currentlyVoted = post.voter_ids.find(
      (x) => x.id === auth?.currentUser?.uid
    );
    if (currentlyVoted) {
      if (currentlyVoted.vote === "up") {
        setUpvoted(true);
      } else {
        setDownvoted(true);
      }
    }
  }, []);
  function handleclick(amount: number) {
    if (amount === 1) {
      mutate({ id: post.id, vote: "up" });
    } else {
      mutate({ id: post.id, vote: "down" });
    }
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
      <div className="rounded-md pb-4 bg-slate-950 max-w-lg mx-auto w-fullshadow-xl mb-4">
        <div className="flex gap-4 items-center pt-4 pl-4">
          <div className="relative">
            <img
              src={
                user && user.profile_photo
                  ? user.profile_photo
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              className=" w-12 h-12 rounded-full object-cover"
            />
            <div
              className={`absolute bottom-0 right-0 w-5 h-5 rounded-full ${
                user.type === "r" ? "bg-blue-600" : "bg-yellow-500"
              }  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`}
            >
              {user.type === "r" ? <BiBookReader /> : <BiEditAlt />}
            </div>
          </div>
          <div className="text-sm">
            <a href="#" className="text-lg font-bold">
              {user.username || "user"}
            </a>
            {/* @ts-ignore */}
            {post.community && "/"}
            <a href="#">
              {/* @ts-ignore */}

              {post.community && post.community.length > 15
                ? /* @ts-ignore */

                  post.community.substring(0, 15) + "..."
                : /* @ts-ignore */

                  post.community}
            </a>
            <div className="flex gap-2 text-base text-zinc-400">
              <p>{getDate(post.created_at)}</p>
              {/* @ts-ignore */}
              {post.location && (
                <a href="#" className="flex gap-1 items-center">
                  {/* @ts-ignore */}
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
        <div className="px-4 pt-4">
          <p>{post.text.length < 200? post.text : 
            <>
              {showMore? post.text :post.text.slice(0,200)}
              <span className="ml-1 cursor-pointer underline" onClick={()=>setShowMore(!showMore)}>{showMore?"show less":"show more"}</span>
            </>}</p>
        </div>
        {/* @ts-ignore */}
        {post.image && (
          <figure className="px-4 pt-4">
            {/* @ts-ignore */}
            <img src={post.image} className="" />
          </figure>
        )}
        <div className="flex gap-4 items-center px-4 py-2">
          <p className="flex gap-2 items-center">
            <BiUpvote
              className={`${upVoted ? "text-blue-600" : "text-white"}`}
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
            onClick={() => {
              console.log(post.id);
              setDisplayComms(!displayComms);
            }}
          >
            <BiCommentDetail />{" "}
            <span className="text-sm">{`Comments (${post.comment_ids.length})`}</span>
          </label>
          <BiShareAlt />
          <BiStar className="ml-auto" />
        </div>
        {displayComms && <CommentsContent postID={post.id} />}
      </div>
      {/* <Comments comms={post.comments} type="Comments" postID={post.id}/> */}
    </>
  );
}
