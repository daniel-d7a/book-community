import {TfiLocationPin} from "react-icons/tfi"
import {BiUpvote,BiDownvote, BiCommentDetail,BiShareAlt,BiStar,BiDotsHorizontalRounded,BiBookReader,BiEditAlt} from "react-icons/bi"
export default function Post({user, community , text, reacts, comments}) {

    return(<>
        <div className="card w-full bg-base-100 shadow-xl mb-2">
        <div className="flex gap-4 items-center pt-4 pl-4">
            <div className="relative">
                <img src="https://spunout.ie/wp-content/uploads/2021/01/portrait-black-young-man-face-man-person-ethnic-student-diversity-diverse-confident-millennial_t20_K6aZOV-2.jpg" alt="Shoes" className=" w-12 h-12 rounded-full object-cover" />
                <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full ${user.state ==="r"? "bg-teal-500": "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`}>
                    {user.state === "r"? <BiBookReader/> : <BiEditAlt/>}
                </div>
            </div>
            <div className="text-sm">
                <a href="#">{user.username || "user"} / <a href="#">{community.length > 15? community.substring(0,15) + '...' : community}</a></a>
                <div className="flex gap-2 text-xs text-zinc-400">
                    <p>30 minutes ago</p>
                    <a href="#" className="flex gap-1 items-center"><TfiLocationPin/> Cairo, Egypt</a>
                </div>
            </div>
            
            <div className="dropdown dropdown-end ml-auto mr-4">
                <label tabIndex={0} className="">
                    <BiDotsHorizontalRounded className="text-2xl"/>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    <li><a>Hide</a></li>
                    <li><a>Report</a></li>
                    <li><a>Copy Link</a></li>
                </ul>
            </div>
        </div>
        <div className="pl-4 pt-4">
            <p>{text}</p>
        </div>
        <figure className="px-4 pt-4">
            <img src="https://www.flenov.info//pics/4a5/4077-HeadFirstJavaScript.jpg" alt="Shoes" className="" />
        </figure>
        <div className="flex gap-4 items-center px-4 py-2">
            <p className="flex gap-2 items-center"><BiUpvote/> {reacts} <BiDownvote/></p>
            <p className="flex gap-2 items-center"><BiCommentDetail/> {comments}</p>
            <BiShareAlt/>
            <BiStar className="ml-auto"/>
        </div>
        </div>
    </>)
}