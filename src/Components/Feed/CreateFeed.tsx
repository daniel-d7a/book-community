import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiLocationPin } from "react-icons/tfi";
import { CgPoll } from "react-icons/cg";
import Icon from "./atoms/icon";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../Firebase/api/database/PostsApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { auth } from "../../Firebase/api/auth/auth";
import { BiCalendar, BiImage, BiVideo } from "react-icons/bi";



export default function CreateFeed() {
  const scheme = z.object({
    postText: string().min(1, { message: "post text can't be empty" }),
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

  const { mutate } = useMutation({
    mutationFn: createPost,
  });

  function submit(data: z.infer<typeof scheme>) {
    console.log(auth.currentUser);
    // console.log(errors);
    console.log(data);
    mutate({ text: data.postText });
    reset();
  }

  return (
    <div className="max-w-2xl mx-auto w-full bg-slate-950 h-fit mt-2 mb-6 rounded-md px-3 py-3">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img
                src={auth.currentUser.profile?auth.currentUser.profile:"https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
                className="w-full object-cover "
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

            <button
              type="submit"
              className="bg-yellow-500 px-8 py-2 mt-2 rounded-md"
            >
              post
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
      {/* <div className="max-w-2xl mx-auto w-full flex flex-col justify-center items-center my-4 bg-base-300 p-4 gap-4">
        <label
          // onFocus={(e) => (e.target.style.height = "100px")}
          className="h-14 focus-within:h-64 overflow-hidden focus-within:overflow-visible flex flex-wrap justify-center items-start w-full bg-base-100 "
        >
          <div className="w-10 h-10 ml-4 mt-2 rounded-full overflow-hidden">
            <img
              src={auth.currentUser.profile?auth.currentUser.profile:"https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
              className="w-full object-cover "
            />
          </div>
          <form onSubmit={handleSubmit(submit)} className="w-10/12">
            <textarea
              {...register("postText")}
              placeholder="Add a post"
              className="focus:outline-none bg-transparent h-36 p-2 bg-base-300 m-2 resize-none transition-all w-full"
            ></textarea>
            <div className="text-red-600">{errors.postText?.message}</div>

            <button
              type="submit"
              className="self-end mr-2 btn mt-1 block width-full px-20 mb-4"
            >
              post
            </button>
          </form>
        </label>

        <div className="capitalize w-full flex justify-around items-center">
          <Icon
            icon={<HiOutlineEmojiHappy />}
            text={"feeling"}
            styles="badge-info"
          />
          <Icon
            icon={<TfiLocationPin />}
            text={"location"}
            styles="badge-success"
          />
          <Icon icon={<CgPoll />} text={"poll"} styles="badge-warning" />
        </div>
      </div> */}
    </div>
  );
}
