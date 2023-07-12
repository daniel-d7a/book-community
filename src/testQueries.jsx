import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPosts } from "./Firebase/api/database/PostsApi";
import { getCurrentUser, logout } from "./Firebase/api/auth/auth";
import { auth } from "./Firebase/api/auth/auth";

export default function TestQueries() {
  const { data: user, error } = useQuery({
    queryKey: ["test"],
    queryFn: getCurrentUser,
  });

  console.log(user);

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    enabled: !!user.uid,
    queryFn: () => getUserPosts(user.uid),
  });

  console.log("data ", posts);

  return (
    <>
      <p>data</p>
      {/* <button
        className="btn"
        onClick={() => {
          mutate({
            text: "new test",
          });
        }}
      >
        try query
      </button>
      <button
        className="btn"
        onClick={() => {
          mutate();
        }}
      >
        logout
      </button> */}
    </>
  );
}
