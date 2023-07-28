import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getPostComments } from "./Firebase/api/database/CommentsApi";
import {
  getUserById,
  uploadUserProfilePhoto,
} from "./Firebase/api/database/UserApi";
import { createPost } from "./Firebase/api/database/PostsApi";

export default function TestQueries() {
  // const { data, status } = useQuery({
  //   queryKey: ["test query"],
  //   queryFn: () => getUserById("Vm4MlX4a5havyADcmomHsSWQ2tg2"),
  // });

  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { mutate, status, data } = useMutation({
    mutationFn: ({ text, images }: { text: string; images: File[] }) =>
      createPost({ text, images }),
  });

  if (status === "loading") return <>loading...</>;
  if (status === "success") {
    console.log(data);
  }

  return (
    <>
      <p>data</p>
      <input
        onChange={() => {
          console.log("fileref ", fileRef?.current?.files);
        }}
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
      />

      <button
        className="btn"
        onClick={() => {
          mutate({
            text: "test post with images",
            images:
              (fileRef?.current?.files && Array.from(fileRef.current.files)) ||
              [],
          });
        }}
      >
        upload
      </button>
    </>
  );
}
