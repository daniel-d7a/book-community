import CreateFeed from "../Feed/CreateFeed"
import Post from "../Post/Post"
import { useEffect } from "react"
import { auth } from "../../Firebase/api/auth/auth"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getAllPosts } from "../../Firebase/api/database/PostsApi"
export default function Home({feed}) {
    const navigate = useNavigate()
    function logOut(){
        window.localStorage.removeItem("currentUser")
        navigate("/login")
      }
    const allPosts = getAllPosts()
    console.log("All posts: ", allPosts)
    if(!window.localStorage.getItem("currentUser")){
        return <Navigate to="/login" replace/>
    }
    useEffect(()=>console.log(auth.currentUser),[])
    return(<>
        <button onClick={logOut} className="bg-yellow-500 px-4 py-2">Logout</button>
        <CreateFeed/>
        {feed.map(post => <Post user = {post.user} post={post}/>)}
    </>)
}