import { useParams } from "react-router-dom";
import { auth } from "../../Firebase/api/auth/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../Firebase/api/database/UserApi";
import { BiDotsHorizontalRounded, BiPen, BiPencil } from "react-icons/bi";
import CreateFeed from "../Feed/CreateFeed";
import { getUserPosts } from "../../Firebase/api/database/PostsApi";
import Post from "../Post/Post";
import { SignUpData } from "../../Types/Auth";
import { ApiPost } from "../../Types/Posts";
import Nav from "../Nav/Nav";

export default function Profile() {
  window.scrollTo(0, 0)
  const params = useParams()
  console.log(params.user_id)
  const { data, status } = useQuery({
    queryKey: ["getUserUsingId"],
    queryFn: () => getUserById(params.user_id),
  });
  const { data:postsData, status:postsDataStatus } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: () => getUserPosts(params.user_id?params.user_id:""),
  });
  
  return(<div className="bg-slate-900 min-h-screen mb-0 overflow-hidden">
    <Nav/>
    <div className="px-4 pt-20 flex flex-col">
      {status === "loading" && <>
        <div
          role="status"
          className="w-full h-screen flex flex-col pt-4 items-center"
        >
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </>}
      {status === "success" && <>
        <div className="w-full bg-slate-950 mb-4 max-w-lg md:mx-auto pt-20 pb-4 relative rounded-md overflow-hidden">
          <div className={`w-full h-36 absolute top-0 z-0 left-0 ${data?.type === 'r'? "bg-blue-600":"bg-yellow-500"}`}></div>
          <div className="flex w-full z-20 flex-col gap-4 relative items-center">
            <img src={data?.profile_photo} className="w-28 h-28 rounded-full object-cover border-white border-[3px]" alt="" />
            <p className="text-2xl font-bold">{data?.username}</p>
            <p className="text-lg">{data?.type === 'r'? "Reader":"Writer"}</p>
            {params.user_id === auth.currentUser?.uid && <div className="flex gap-4">
                <button
                  className="p-2 px-4 flex items-center gap-1 rounded-md bg-yellow-950 text-yellow-500 text-sm md:text-base"
                >
                  Edit profile
                  <BiPencil className="text-xl"/>
                </button>
                <button className="p-2 px-3 rounded-md text-lg flex items-center justify-center bg-slate-900"><BiDotsHorizontalRounded className="text-2xl" /></button>
            </div>}
          </div>
          
        </div>
        {params.user_id === auth.currentUser?.uid && <CreateFeed/>}
        {postsDataStatus === "loading" && 
          <div role="status" className="w-full flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        }
        {postsDataStatus === "success" && postsData.sort(function(a,b){return b.created_at - a.created_at}).map(
        (post) =>
          post.user_data && (
            <Post
              key={post.id}
              user={post.user_data as SignUpData}
              post={post as ApiPost}
            />
          )
        )}
      </>}
    </div>
    
  </div>)

}
