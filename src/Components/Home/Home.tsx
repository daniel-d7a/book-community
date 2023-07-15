import CreateFeed from "../Feed/CreateFeed";
import Post from "../Post/Post";
import { useEffect } from "react";
import { auth } from "../../Firebase/api/auth/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../Firebase/api/database/PostsApi";
import { useQuery } from "@tanstack/react-query";
import { SignUpData } from "../../Types/Auth";
import { ApiPost } from "../../Types/Posts";
export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("currentUser");
    window.sessionStorage.removeItem("currentUser");
    navigate("/login");
  };
  const { data, status } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  console.log("All posts:", data);

  if (
    !window.localStorage.getItem("currentUser") &&
    !window.sessionStorage.getItem("currentUser")
  ) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => console.log(auth.currentUser), []);
  if (status === "loading") return <></>;
  if (status === "success")
    return (
      <>
        <button onClick={logOut} className="bg-yellow-500 px-4 py-2">
          Logout
        </button>
        <CreateFeed />
        {data.map((post) => (
          <Post user={post.user_data as SignUpData} post={post as ApiPost} />
        ))}
      </>
    );
}
