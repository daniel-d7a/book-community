import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "../../Firebase/api/database/CommentsApi"
import CommentContentBody from "./CommentContentBody";

export default function CommentsContent({postID}) {
    const { data, status } = useQuery({
        queryKey: ["commsForPost"],
        queryFn: ()=>{
            getPostComments(postID)
        },
    });
    console.log(postID)
    console.log("All comments:", data);
    if (status === "loading"){
        return (<span className="loading loading-spinner text-warning"></span>)
    }
    return(<>
        {data && data.map(comm => {
            <CommentContentBody comment={comm}/>
        })}
    </>)
}