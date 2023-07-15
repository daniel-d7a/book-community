import CreateFeed from "../Feed/CreateFeed";
import Post from "../Post/Post";
import { useEffect } from "react";
import { auth } from "../../Firebase/api/auth/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../Firebase/api/database/PostsApi";
import { useQuery } from "@tanstack/react-query";
<<<<<<< HEAD:src/Components/Home/Home.jsx
import Nav from "../Nav/Nav";
export default function Home({ feed }) {
=======
import { SignUpData } from "../../Types/Auth";
import { ApiPost } from "../../Types/Posts";
export default function Home() {
>>>>>>> 5631bc76ee9f92ed9a05fbd86954ec05cebdb41f:src/Components/Home/Home.tsx
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
<<<<<<< HEAD:src/Components/Home/Home.jsx
  if (status === "loading") return(<></>)
  if (status === 'success')
  return (
    <div className="bg-slate-900">
    <Nav/>
      <div className="px-4">
        <CreateFeed />
        {data.map((post) => (
          post.user_data && <Post user={post.user_data} post={post} />
        ))}
      </div>
    </div>
  );
=======
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
>>>>>>> 5631bc76ee9f92ed9a05fbd86954ec05cebdb41f:src/Components/Home/Home.tsx
}
