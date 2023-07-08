import { useState, useRef, useEffect } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../../Firebase/api/auth/auth";
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
  });
  const [wrongData, setWrongData] = useState(false);

  const { errors } = formState;
  const [check, setCheck] = useState(false);
  const timer = useRef();
  const navigate = useNavigate();
  function submit(d) {
    mutate(d);
  }
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.log({ ...error });
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setWrongData(true);
        timer.current = setTimeout(() => {
          setWrongData(false);
        }, 3000);
      }
    },
  });
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, [timer]);

  return (
    <div className="relative bg-base-200 h-[100vh] w-full flex flex-col md:flex-row md:justify-end justify-center items-center py-10 md:px-0">
      <img
        className="absolute contrast-125 object-cover object-left w-full h-full "
        src="https://source.unsplash.com/UsEHH1sd4rE"
      />
      <div className="md:w-2/5 py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm">
        <h2 className="text-4xl md:text-5xl font-semibold mb-16 md:mb-8 md:text-center">
          Log In
        </h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full py-8 md:py-6"
            {...register("email")}
          />
          <div className="text-red-600">{errors.email?.message}</div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full py-8 md:py-6"
            {...register("password")}
          />
          <div className="text-red-600">{errors.password?.message}</div>
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
            className="text-lg font-semibold bg-base-300 w-full py-5 md:py-3"
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
          <button className="text-lg flex justify-center font-semibold bg-base-300 w-full py-3.5 md:py-3">
            <AiOutlineGoogle className="text-4xl md:text-3xl" />
          </button>
        </form>
        <p className="font-light text-center mt-10 md:mt-14">
          Don't have an account? <span className="font-semibold">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
