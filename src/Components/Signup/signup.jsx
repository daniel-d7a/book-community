import { AiOutlineGoogle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCurrentUser, signup } from "../../Firebase/api/auth/auth";
import { useNavigate } from "react-router";

export default function SignUp() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });
  const navigate = useNavigate();

  // signup the user using firebase auth
  const {
    mutate,
    data: authData,
    error,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: signup,
    mutationKey: ["currentUser"],
    onSuccess: async (data) => {
      console.log("auth data from firebase", data);
      await getCurrentUser();
      // navigate("/login");
    },
  });
  // add user to users collection

  async function submitHandler(userData) {
    console.log("user data from submit handler", userData);
    mutate(userData);
  }

  // TODO: make password type password

  return (
    <div className="relative bg-slate-900 h-screen w-full flex items-center justify-center py-10 md:px-0">
      <div className="md:w-2/5 bg-slate-950 rounded-lg flex flex-col items-center py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm">
        {isLoading && <p>Loading...</p>}

        <h2 className="text-3xl font-bold mb-2 md:text-center">
          Sign Up
        </h2>
        <p className="font-light text-center mb-6">
          Already have an account? <span className="text-yellow-500" onClick={()=>navigate("/login")}>Log In</span>
        </p>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full py-6 rounded-sm bg-slate-900 focus:outline-none focus:border-yellow-500"
            {...register("email", { required: true })}
          />
          <input
            type="text"
            placeholder="User Name"
            className="input input-bordered w-full py-6 rounded-sm bg-slate-900 focus:outline-none focus:border-yellow-500"
            {...register("username", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full py-6 rounded-sm bg-slate-900 focus:outline-none focus:border-yellow-500"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full py-6 rounded-sm bg-slate-900 focus:outline-none focus:border-yellow-500"
            {...register("confirmPassword", { required: true })}
          />
          <button
            type="submit"
            className="text-lg font-semibold rounded-sm w-full py-3 bg-yellow-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
