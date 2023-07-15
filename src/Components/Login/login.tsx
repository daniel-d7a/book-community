import { useState, useRef, useEffect } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { auth, login } from "../../Firebase/api/auth/auth.js";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

const scheme = z.object({
  email: string().email({ message: "Invalid email address" }),
  password: string().min(6, { message: "Password is too short" }),
});

export default function Login() {

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(scheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [wrongData, setWrongData] = useState(false);

  const { errors } = formState;
  const [check, setCheck] = useState(false);
  const timer = useRef<number>();
  const navigate = useNavigate();
  function submit(d: z.infer<typeof scheme>) {
    const data = { ...d, rememberMe: check };
    // console.log(data)
    mutate(data);
  }
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: any) => {
      console.log({ ...error });
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setWrongData(true);
        timer.current = window.setTimeout(() => {
          setWrongData(false);
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (window.localStorage.getItem("currentUser")) {
      console.log(
        JSON.parse(window.localStorage.getItem("currentUser")!).user.uid
      );
      navigate("/");
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [timer]);

  return (
    <div className="relative bg-slate-900 h-screen w-full flex items-center justify-center py-10 md:px-0">

      <div className="md:w-2/5 bg-slate-950 w-full rounded-lg flex flex-col items-center py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-2 md:text-center">
          Log In
        </h2>
        <p className="font-light text-center mb-6">Don't have an account? <span onClick={()=>navigate("/signup")} className="text-yellow-500">Sign Up</span></p>
        <form onSubmit={handleSubmit(submit)} className="space-y-2 w-full">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full py-6 rounded-sm bg-slate-900 focus:outline-none focus:border-yellow-500"
            {...register("email")}
          />
          {/* TODO: REMOVE THIS ERROR WHEN THE FORM LOADS FIRST TIME AND SHOW IT ONLY WHEN I SUBMIT WHILE SOMETHING WRONG*/}
          <div className="text-red-600">{String(errors.email?.message?errors.email.message:"")}</div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full py-6 rounded-sm bg-slate-900 focus:outline-none focus:border-yellow-500"
            {...register("password")}
          />
          <div className="text-red-600">{String(errors.password?.message?errors.password.message:"")}</div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Remember me</span>
              <input
                type="checkbox"
                checked={check}
                onClick={() => {
                  setCheck(!check);
                }}
                className="checkbox checkbox-sm checkbox-warning"
              />
            </label>
          </div>
          <button
            type="submit"
            className="text-lg font-semibold rounded-sm w-full py-3 bg-yellow-500"
          >
            Log In
          </button>
          <div
            className={`alert alert-error my-4 rounded-none h-12 ${
              !wrongData ? "hidden" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Wrong email or password</span>
          </div>
          <p className="text-center font-light">or sign up with</p>
          <button className="text-lg flex justify-center font-semibold bg-slate-900 rounded-sm w-full py-2 md:py-3">
            <AiOutlineGoogle className="text-4xl md:text-3xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
