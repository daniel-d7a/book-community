import { useMutation, useQuery } from "@tanstack/react-query";
<<<<<<< HEAD
import { useRef } from "react";
import { getPostComments } from "./Firebase/api/database/CommentsApi";
import { getAllUsers, getUserById, uploadUserProfilePhoto } from "./Firebase/api/database/UserApi";
=======
import { useRef, useState } from "react";
import { getAllPostsPaginated } from "./Firebase/api/database/PostsApi";
>>>>>>> 5138c455aaea4329308333484e21259121e8f0d6

export default function TestQueries() {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery({
<<<<<<< HEAD
    queryKey: ["test query"],
    queryFn: () => getAllUsers(),
=======
    queryKey: ["test query", page],
    queryFn: getAllPostsPaginated,
>>>>>>> 5138c455aaea4329308333484e21259121e8f0d6
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
