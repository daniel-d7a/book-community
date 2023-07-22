import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import {
  addReply,
  getCommentReplies,
} from "./Firebase/api/database/RepliesApi";
import {
  getProfilePhoto,
  uploadProfilePhoto,
} from "./Firebase/api/database/UserApi";

export default function TestQueries() {
  const { data, status } = useQuery({
    queryKey: ["test query"],
    queryFn: () => getProfilePhoto(),
  });

  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // const { mutate, status, data } = useMutation({
  //   mutationFn: () => uploadProfilePhoto(fileRef?.current?.files?.[0]),
  // });

  if (status === "loading") return <></>;
  if (status === "success") {
    console.log(data);
  }

  return (
    <>
      <p>data</p>
      <input
        onChange={() => {
          console.log("fileref ", fileRef?.current?.files?.[0]);
        }}
        ref={fileRef}
        type="file"
      />
      <img src={data} />
      {/* <button
        className="btn"
        onClick={() => {
          mutate();
        }}
      >
        upload
      </button> */}
    </>
  );
}
