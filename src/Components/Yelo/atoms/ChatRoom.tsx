import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMessage,
  getChatMessages,
  getMessagesRealTime,
} from "../../../Firebase/api/database/MessagesApi";
import MessageBubble from "./MesssageBubble";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsSendFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

export default function ChatRoom({ chatID }: { chatID: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scheme = z.object({
    msgText: string().min(1, { message: "message text can't be empty" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(scheme),
    defaultValues: {
      msgText: "",
    },
  });
  if (!chatID) {
    return (
      <div className="h-full flex flex-col gap-4 items-center justify-center lg:w-3/4 w-full bg-slate-800">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/book-community-8cbb7.appspot.com/o/illustrates%2Fundraw_quick_chat_re_bit5.svg?alt=media&token=23945bd8-d876-4a19-bde5-5b1aa47de02c"
          alt=""
          className="w-40"
        />

        <p className="text-2xl text-yellow-500 font-bold">
          Welcome to Yelo chat
        </p>
      </div>
    );
  }
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) =>
      addMessage(id, text),

    // onSuccess: async () => {
    //   const updatedMessages = await queryClient.fetchQuery([
    //     "msgsForChat",
    //     chatID,
    //   ]);
    //   queryClient.setQueryData(["msgsForChat", chatID], updatedMessages);
    // },
  });
  // const { data, status } = useQuery({
  //   queryKey: ["msgsForChat", chatID],
  //   queryFn: () => getMessagesRealTime(chatID),
  // });

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const initialMessages = await getChatMessages(chatID);
      setData(initialMessages);
    })();
  }, []);

  // function scrollDown() {

  // }

  useEffect(() => {
    let messagesSnapshot!: any;
    (async () => {
      messagesSnapshot = await getMessagesRealTime(chatID, setData);
    })();

    return () => messagesSnapshot?.unsubscribe();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [data]);

  function submit(data: any) {
    console.log(data);

    mutate({ text: data.msgText, id: chatID });
    reset();
  }
  return (
    <div className="lg:h-full h-5/6 relative lg:w-3/4 pb-4 w-full bg-slate-800">
      <div className="px-4 overflow-y-scroll h-full">
        {
          // status === "success" &&
          data?.map((msg, index) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        }
        <div
          ref={containerRef}
          className="h-10 w-full"
        ></div>
      </div>
      <div className="fixed bottom-0 lg:left-1/4 left-0 w-full lg:w-3/4">
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full bg-slate-900 h-12 flex items-center"
        >
          <textarea
            {...register("msgText")}
            placeholder="Write a message"
            className="focus:outline-none bg-transparent h-12 flex items-center max-h-64 p-2 pl-3 rounded-md resize-none transition-all w-full"
          ></textarea>
          <button type="submit" className="mr-3 text-xl text-yellow-500">
            <BsSendFill />
          </button>
        </form>
      </div>
    </div>
  );
}
