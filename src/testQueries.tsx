import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { getPostComments } from "./Firebase/api/database/CommentsApi";
import { getUserById, uploadUserProfilePhoto } from "./Firebase/api/database/UserApi";

export default function TestQueries() {
  const { data, status } = useQuery({
    queryKey: ["test query"],
    queryFn: () => getUserById("Vm4MlX4a5havyADcmomHsSWQ2tg2"),
  });

  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // const { mutate, status, data } = useMutation({
  //   mutationFn: () =>
  //     uploadUserProfilePhoto(
  //       "Vm4MlX4a5havyADcmomHsSWQ2tg2",
  //       fileRef?.current?.files?.[0]!
  //     ),
  // });

  if (status === "loading") return <></>;
  if (status === "success") {
    console.log(data);
  }

  return (
    <>
      <p>data</p>
      {/* <input
        onChange={() => {
          console.log("fileref ", fileRef?.current?.files?.[0]);
        }}
        ref={fileRef}
        type="file"
      />
      <button
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
