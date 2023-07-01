import CommentReplyWidget from "./CommentReplyWidget"
export default function Comments({type,comms,postID}) {
    return(<>
        <CommentReplyWidget type={type} comms={comms} postID={postID}/>
    </>)
}