import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
} from "./Firebase/api/database/PostsApi";
import { getCurrentUser, logout } from "./Firebase/api/auth/auth";

export default function TestQueries() {
  // const { data, error, isLoading, isError } = useQuery({
  //   queryKey: ["currentUser"],
  //   // get current logged in user
  //   queryFn: getCurrentUser,

  //   // get post by id
  //   // queryFn: async () => await getPostById("H9qLi9tkWs2S98afqLjC"),

  //   // get all posts
  //   // queryFn: getAllPosts,
  // });

  const {
    mutate,
    isLoading: isLoading2,
    isError: isError2,
    data: data2,
    error: error2,
  } = useMutation({
    // delete post by id
    // mutationFn: deletePostById,
    // create post
    mutationFn: logout,
  });

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (isError) {
  //   console.log(error);
  //   return (
  //     <>
  //       <p>Error</p>
  //       <button className="btn">try query again</button>
  //     </>
  //   );
  // }
  console.log("data", data2);

  return (
    <>
      <p>data</p>
      <button
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
      </button>
    </>
  );
}
