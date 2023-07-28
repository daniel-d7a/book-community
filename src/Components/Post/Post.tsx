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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import CommentsContent from "../Comments/CommentsContent";
import { deletePostById, votePost } from "../../Firebase/api/database/PostsApi";
import { auth } from "../../Firebase/api/auth/auth";
import PhotoGrid from "./atoms/PhotoGrid";

type PostProps = {
  user: SignUpData;
  post: ApiPost;
};

export type Vote = { id: string; vote: "up" | "down" };

export default function Post({ user, post }: PostProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showMore, setShowMore] = useState(false);
  const [displayComms, setDisplayComms] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { mutate } = useMutation({
    mutationFn: ({ id, vote }: Vote) => votePost(id, vote),
  });
  const { mutate: deletePostMutate, isLoading } = useMutation({
    mutationFn: () => deletePostById(post.id),
    onSuccess: async () => {
      const updatedPosts = await queryClient.fetchQuery([
        `${window.location.pathname === "/" ? "posts" : "getUserPosts"}`,
      ]);
      queryClient.setQueryData(
        [`${window.location.pathname === "/" ? "posts" : "getUserPosts"}`],
        updatedPosts
      );
    },
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
      {deleteClicked && (
        <div className="w-full flex items-center justify-center  px-2 h-screen z-50 bg-black bg-opacity-50 fixed top-0 left-0">
          <div className="w-full max-w-lg flex flex-col gap-8 items-center opacity-100 py-8 bg-slate-900 rounded-md px-4 ">
            <p>
              Are you sure you want to delete this post? if you delete it, you
              won't be able to get it back
            </p>
            <div className="flex gap-4">
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  deletePostMutate();
                  setDeleteClicked(false);
                  (e.target as HTMLButtonElement).disabled = true;
                }}
                className="p-2 px-4 rounded-md bg-yellow-950 text-yellow-500 text-sm md:text-base"
              >
                {isLoading ? (
                  <div
                    role="status"
                    className="w-full flex flex-col items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Delete"
                )}
              </button>

              <button
                className="p-2 px-4 rounded-md text-red-500 bg-red-950 bg-opacity-50 text-sm md:text-base"
                onClick={() => setDeleteClicked(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-md pb-4 bg-slate-950 w-full max-w-lg mx-auto w-fullshadow-xl mb-4">
        <div className="flex gap-4 items-center pt-4 pl-4">
          <div className="relative">
            <img
              onClick={() => navigate(`/profile/${post.user_id}`)}
              src={
                user && user.profile_photo
                  ? user.profile_photo
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              className=" w-12 h-12 rounded-full object-cover cursor-pointer"
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
            <Link
              to={`/profile/${post.user_id}`}
              className="text-lg font-bold cursor-pointer"
            >
              {user.username || "user"}
            </Link>
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

          <div
            className={`dropdown dropdown-end ml-auto mr-4 ${
              deleteClicked && "hidden"
            }`}
          >
            <label tabIndex={0} className="cursor-pointer">
              <BiDotsHorizontalRounded className="text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow rounded-box w-52 bg-slate-950"
            >
              {post.user_id === auth.currentUser?.uid && (
                <li onClick={() => setDeleteClicked(true)}>
                  <a>Delete</a>
                </li>
              )}
              <li>
                <a>Hide</a>
              </li>
              <li>
                <a>Report</a>
              </li>
              <li>
                <a>Copy link</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-4">
          <p>
            {post.text.length < 200 ? (
              post.text
            ) : (
              <>
                {showMore ? post.text : post.text.slice(0, 200)}
                <span
                  className="ml-1 cursor-pointer underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "show less" : "show more"}
                </span>
              </>
            )}
          </p>
        </div>

        {!isLoading && <PhotoGrid images={post.images} />}

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
