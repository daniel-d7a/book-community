import { useMutation, useQuery } from "@tanstack/react-query";

import { getPostComments } from "./Firebase/api/database/CommentsApi";
import { getAllUsers, getUserById, uploadUserProfilePhoto } from "./Firebase/api/database/UserApi";

import { useRef, useState } from "react";
import { getAllPostsPaginated } from "./Firebase/api/database/PostsApi";


export default function TestQueries() {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery({
    queryKey: ["test query", page],
    queryFn: getAllPostsPaginated,
  });

  // const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // const { mutate, status, data } = useMutation({
  //   mutationFn: ({ id, vote }: { id: string; vote: "up" | "down" }) =>
  //     voteReply(id, vote),
  // });

  if (status === "loading") return <>loading...</>;
  if (status === "success") {
    console.log("data", data);
  }

  return (
    <>
      <p>data</p>
      <button
        className="btn"
        onClick={() => {
          setPage((page) => page + 1);
          console.log(page);
        }}
      >
        add page
      </button>
      {/* <input
        onChange={() => {
          console.log("fileref ", fileRef?.current?.files);
        }}
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
      /> */}

      {/* <button
        className="btn"
        onClick={() => {
          mutate({
            id: "fkMeQjRHFDkNp14mmeZ9",
            vote: "up",
          });
        }}
      >
        upvote
      </button> */}
    </>
  );
}
