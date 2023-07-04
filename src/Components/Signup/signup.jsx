import { AiOutlineGoogle } from "react-icons/ai";

export default function SignUp() {
  return (
    <div className="relative bg-base-200 h-[100vh] w-full flex flex-col md:flex-row md:justify-end justify-center items-center py-10 md:px-0">
      <img
        className="absolute contrast-125 object-cover object-left w-full h-full "
        src="https://source.unsplash.com/UsEHH1sd4rE"
      />
      {/* <div className="hidden md:block md:w-3/5 h-full">
      </div> */}
      <div className="md:w-2/5 py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm">
        <h2 className="text-4xl md:text-5xl font-semibold mb-16 md:mb-8 md:text-center">
          Sign Up
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full py-8 md:py-6"
          />
          <input
            type="text"
            placeholder="User Name"
            className="input input-bordered w-full py-8 md:py-6"
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full py-8 md:py-6"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full py-8 md:py-6"
          />
          <button className="text-lg font-semibold bg-base-300 w-full py-5 md:py-3">
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
