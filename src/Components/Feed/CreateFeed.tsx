import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiLocationPin } from "react-icons/tfi";
import { CgPoll } from "react-icons/cg";
import Icon from "./atoms/icon";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../Firebase/api/database/PostsApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { auth } from "../../Firebase/api/auth/auth";

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
    <>
      <div className="max-w-2xl mx-auto w-full flex flex-col justify-center items-center my-4 bg-base-300 p-4 gap-4">
        <label
          // onFocus={(e) => (e.target.style.height = "100px")}
          className="h-14 focus-within:h-64 overflow-hidden focus-within:overflow-visible flex flex-wrap justify-center items-start w-full bg-base-100 "
        >
          <div className="w-10 h-10 ml-4 mt-2 rounded-full overflow-hidden">
            <img
              src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
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
      </div>
    </>
  );
}
