import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts, getUserPosts } from "./Firebase/api/database/PostsApi";
import { getCurrentUser, logout } from "./Firebase/api/auth/auth";
import { auth } from "./Firebase/api/auth/auth";
import {
  addComment,
  getPostComments,
} from "./Firebase/api/database/CommentsApi";

export default function TestQueries() {
  const { data, status } = useQuery({
    queryKey: ["test query"],
    queryFn: () => getPostComments("LNWILmPxsx4KW2kNprLx"),
  });

  // const { mutate, status, data } = useMutation({
  //   mutationFn: ({ postId, text }: { postId: string; text: string }) =>
  //     addComment(postId, text),
  // });

  if (status === "loading") return <></>;

  if (status === "success") {
    console.log("data", data);
  }

  return (
    <>
      <p>data</p>
      {/* <button
        className="btn"
        onClick={() => {
          mutate({
            postId: "LNWILmPxsx4KW2kNprLx",
            text: "بحب اياد",
          });
        }}
      >
        try query
      </button> */}
    </>
  );
}
