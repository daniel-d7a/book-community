import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addReply,
  getCommentReplies,
} from "./Firebase/api/database/RepliesApi";

export default function TestQueries() {
  const { data, status } = useQuery({
    queryKey: ["test query"],
    queryFn: () => getCommentReplies("HENbVpa0vf15Bla5Fio0"),
  });

  // const { mutate, status } = useMutation({
  //   mutationFn: ({ commentId, text }: { commentId: string; text: string }) =>
  //     addReply(commentId, text),
  // });

  if (status === "loading") return <></>;
  if (status === "success") {
    console.log(data);
  }

  return (
    <>
      <p>data</p>
      {/* <button
        className="btn"
        onClick={() => {
          mutate({
            commentId: "HENbVpa0vf15Bla5Fio0",
            text: "me three <3",
          });
        }}
      >
        test
      </button> */}
    </>
  );
}
