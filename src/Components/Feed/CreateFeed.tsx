import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiLocationPin } from "react-icons/tfi";
import { CgPoll } from "react-icons/cg";
import Icon from "./atoms/icon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../Firebase/api/database/PostsApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { auth } from "../../Firebase/api/auth/auth";
import { BiCalendar, BiImage, BiVideo } from "react-icons/bi";
import { getUserById } from "../../Firebase/api/database/UserApi";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
//@ts-ignore
import { slider } from "./images.module.css";

export default function CreateFeed() {
  const scheme = z.object({
    postText: string().min(1, { message: "post text can't be empty" }),
  });
  const { data, status } = useQuery({
    queryKey: ["getUserWithId"],
    queryFn: () => getUserById(auth?.currentUser?.uid || ""),
    enabled: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(scheme),
    defaultValues: {
      postText: "",
    },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      const updatedPosts = await queryClient.fetchQuery([
        `${window.location.pathname === "/" ? "posts" : "getUserPosts"}`,
      ]);
      queryClient.setQueryData(
        [`${window.location.pathname === "/" ? "posts" : "getUserPosts"}`],
        updatedPosts
      );
    },
  });

  const [images, setImages] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: useCallback((acceptedFiles: File[]) => {
      // Do something with the files
      console.log(acceptedFiles);
      setImages((files) => [...files, ...acceptedFiles]);
    }, []),
    multiple: true,
  });

  function submit(data: z.infer<typeof scheme>) {
    mutate({ text: data.postText, images });
    setImages([]);
    reset();
  }

  return (
    <div className="mx-auto w-full max-w-lg bg-slate-950 h-fit mt-2 mb-6 rounded-md px-3 py-3">
      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img
            onClick={() => navigate(`/profile/${auth.currentUser?.uid}`)}
            src={
              data?.profile_photo
                ? data?.profile_photo
                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
          />
        </div>
        <div className="w-full mb-4">
          <form onSubmit={handleSubmit(submit)} className="w-full">
            <textarea
              {...register("postText")}
              placeholder="Add a post"
              className="focus:outline-none bg-slate-900 max-h-64 p-2 rounded-md h-28 resize-none transition-all w-full"
            ></textarea>

            <div className="text-red-600">{errors.postText?.message}</div>

            <div
              {...getRootProps({
                className: `cursor-pointer bg-slate-900 p-2 rounded-md h-16 text-center 
                  flex justify-center items-center text-gray-700 transition-all
                  ${isDragActive ? "border-2" : ""}
                  ${
                    data?.type === "w" ? "border-yellow-500" : "border-blue-600"
                  }`,
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Release to Drop ...</p>
              ) : (
                <p>
                  <span className="text-gray-400">Drag 'n' drop</span> some
                  files here
                  <br />
                  or <span className="text-gray-400">click</span> to select
                  files
                </p>
              )}
            </div>
            {images.length > 0 && (
              <div
                className={` ${slider} flex justify-start items-center overflow-x-scroll`}
                style={{
                  scrollbarColor: "red",
                }}
              >
                {images.map((image) => (
                  <img
                    style={{
                      height: "100px",
                      width: "auto",
                    }}
                    src={URL.createObjectURL(image)}
                    key={image.name}
                  />
                ))}
              </div>
            )}

            <button
              type="submit"
              className="bg-yellow-500 px-8 py-2 mt-2 rounded-md"
            >
              {isLoading ? (
                <div
                  role="status"
                  className="w-full flex flex-col items-center"
                >
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
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
              ) : (
                "Post"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400">
          <BiImage className="text-green-600" />
          Photo
        </div>
        <div className="bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400">
          <BiVideo className="text-blue-600" />
          Video
        </div>
        <div className="bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400">
          <BiCalendar className="text-red-600" />
          Event
        </div>
        <div className="bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400">
          <HiEmojiHappy className="text-yellow-500" />
          Feeling /Activity
        </div>
        <div className="bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400">
          ...
        </div>
      </div>
    </div>
  );
}
