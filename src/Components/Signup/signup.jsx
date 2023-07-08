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
    <div className="relative bg-base-200 h-[100vh] w-full flex flex-col md:flex-row md:justify-end justify-center items-center py-10 md:px-0">
      <img
        className="absolute contrast-125 object-cover object-left w-full h-full "
        src="https://source.unsplash.com/UsEHH1sd4rE"
      />
      {/* <div className="hidden md:block md:w-3/5 h-full">
      </div> */}
      <div className="md:w-2/5 py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm">
        {isLoading && <p>Loading...</p>}

        <h2 className="text-4xl md:text-5xl font-semibold mb-16 md:mb-8 md:text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full py-8 md:py-6"
            {...register("email", { required: true })}
          />
          <input
            type="text"
            placeholder="User Name"
            className="input input-bordered w-full py-8 md:py-6"
            {...register("username", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full py-8 md:py-6"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full py-8 md:py-6"
            {...register("confirmPassword", { required: true })}
          />
          <button
            type="submit"
            className="text-lg font-semibold bg-base-300 w-full py-5 md:py-3"
          >
            Sign Up
          </button>
        </form>
        <p className="font-light text-center mt-10 md:mt-14">
          Already have an account? <span className="font-semibold">Log In</span>
        </p>
      </div>
    </div>
  );
}
