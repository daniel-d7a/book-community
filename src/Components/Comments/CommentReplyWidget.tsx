// @ts-nocheck

import Comment from "./Comment";
import { BiSend } from "react-icons/bi";
export default function CommentReplyWidget({ type, comms, postID }) {
  return (
    <>
      <input
        type="checkbox"
        id={`${type === "Comments" ? "comments" : "replies"}_${postID}`}
        className="modal-toggle"
      />
      <div
        className={`modal justify-center z-${
          type === "20" ? "comments" : "50"
        }`}
      >
        <div className="modal-box px-0 pb-0 bg-slate-700">
          <h3 className="font-bold text-lg mb-4 ml-8">{type}</h3>
          <div className="overflow-y-scroll w-full max-h-72 flex flex-wrap justify-center gap-2">
            {comms && comms.map((comm) => (
              <Comment type={type} user={comm.user} comment={comm} />
            ))}
          </div>
          <div className="w-full flex justify-center pt-2 px-2">
            <div className="form-control w-full">
              <div className="input-group w-full">
                <textarea
                  placeholder={`Add a ${
                    type === "Comments" ? "Comment" : "Reply"
                  }`}
                  className="py-3 pl-3 bg-slate-800 overflow-hidden break-words resize-none outline-none border-none w-full h-12"
                />
                <button className="btn btn-square bg-yellow-500 border-none">
                  <BiSend className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor={`${
                type === "Comments" ? "comments" : "replies"
              }_${postID}`}
              onClick={() =>
                type === "Comments"
                  ? (document.body.style.overflow = "unset")
                  : (document.body.style.overflow = "hidden")
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
