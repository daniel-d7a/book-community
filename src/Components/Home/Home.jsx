import CreateFeed from "../Feed/CreateFeed";
import Post from "../Post/Post";
import { useEffect } from "react";
import { auth } from "../../Firebase/api/auth/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../Firebase/api/database/PostsApi";
import { useQuery } from "@tanstack/react-query";
export default function Home({ feed }) {
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("currentUser");
    window.sessionStorage.removeItem("currentUser");
    navigate("/login");
  };
  const { data } = useQuery({
    queryKey: ["currentUser"],
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
  return (
    <>
      <button onClick={logOut} className="bg-yellow-500 px-4 py-2">
        Logout
      </button>
      <CreateFeed />
      {feed.map((post) => (
        <Post user={post.user} post={post} />
      ))}
    </>
  );
}
