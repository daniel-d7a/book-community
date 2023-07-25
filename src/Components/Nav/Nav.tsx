import { ChangeEvent, MouseEventHandler, useRef, useState } from "react";
import {
  BiHomeAlt,
  BiSearch,
  BiUser,
  BiBell,
  BiBookOpen,
  BiMenu,
  BiChat,
  BiPowerOff,
  BiSun,
  BiMoon,
} from "react-icons/bi";
import { HiOutlineViewList } from "react-icons/hi";
import { TfiSettings } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/api/auth/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserById,
  uploadUserProfilePhoto,
} from "../../Firebase/api/database/UserApi";
import { AiFillWarning } from "react-icons/ai";
export default function Nav() {
  const [selectedImage, setSelectedImage] = useState("");

  const inputFile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const [changeProfile, setChangeProfile] = useState(false);
  const [tools, setTools] = useState(false);
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]!;
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };
  const onButtonClick = () => {
    inputFile.current?.click();
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      uploadUserProfilePhoto(
        auth?.currentUser?.uid!,
        inputFile?.current?.files?.[0]!
      ),
    onSuccess: async () => {
      console.log("changed successfully");
      location.reload();
    },
  });
  const { data, status } = useQuery({
    queryKey: ["getUserWithId"],
    queryFn: () => getUserById(auth?.currentUser?.uid!),
  });
  const logOut = () => {
    window.localStorage.removeItem("currentUser");
    window.sessionStorage.removeItem("currentUser");
    navigate("/login");
  };
  if (status === "success") {
    return (
      <>
        {inputFile.current?.value && (
          <div className="w-full flex items-center justify-center  px-2 h-screen z-50 bg-black bg-opacity-50 fixed top-0 left-0">
            <div className="w-full max-w-lg flex flex-col gap-8 items-center opacity-100 py-8 bg-slate-900 rounded-md px-4">
              <p className="text-yellow-500 flex items-start gap-2">
                Warning: you're about to Change your profile picture
              </p>
              <img
                src={selectedImage}
                className=" w-40 h-40 rounded-full object-cover"
              />
              <div className="flex gap-4">
                <button
                  className="p-2 px-4 rounded-md bg-yellow-500"
                  onClick={(e) => {
                    console.log("clicked");
                    mutate();
                    (e.target as HTMLButtonElement).disabled = true;
                  }}
                >
                  {isLoading?<div
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
                  </div>:"Save"}
                </button>
                <button
                  className="p-2 px-4 rounded-md bg-yellow-950 text-yellow-500 text-sm md:text-base"
                  onClick={onButtonClick}
                >
                  Select other photo
                </button>
                <button
                  className="p-2 px-4 rounded-md text-red-500 bg-red-950 bg-opacity-50 text-sm md:text-base"
                  onClick={() => {
                    inputFile.current.files = null;
                    setSelectedImage("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="navbar justify-between bg-slate-950 fixed top-0 mb-4 z-30">
          <div
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center text-lg font-bold rounded-sm bg-yellow-500"
          >
            <BiBookOpen />
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900">
                <BiMenu />
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900">
                <BiChat />
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900">
                <TfiSettings />
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900">
                <BiBell />
              </div>
              <div
                onClick={() => setTools(!tools)}
                className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900 overflow-hidden"
              >
                <img
                  src={
                    data?.profile_photo
                      ? data?.profile_photo
                      : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  }
                />
              </div>
              <div
                className={`absolute top-14 right-3 w-60 p-4 bg-slate-950 rounded-md ${
                  tools ? "" : "invisible"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <img
                      onClick={() => setChangeProfile(!changeProfile)}
                      src={
                        data?.profile_photo
                          ? data?.profile_photo
                          : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                      }
                      className=" w-12 h-12 rounded-full object-cover cursor-pointer"
                    />
                    {changeProfile && (
                      <button
                        onClick={onButtonClick}
                        className="z-40 absolute top-12 left-8 rounded-md bg-slate-950 p-2 text-sm md:text-base"
                      >
                        Change profile picture
                      </button>
                    )}
                    <input
                      onChange={onFileSelected}
                      type="file"
                      id="file"
                      ref={inputFile}
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{data?.username}</p>
                      <p className="text-sm text-gray-400">
                        {data?.type === "r" ? "Reader" : "Writer"}
                      </p>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center py-2 text-sm bg-yellow-950 text-yellow-500">
                    View profile
                  </button>
                  <button
                    onClick={logOut}
                    className="w-full flex items-center p-4 "
                  >
                    <BiPowerOff />
                    <span className="ml-2">Sign Out</span>
                  </button>
                  <div className="flex gap-4">
                    <div className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900">
                      <BiSun />
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900">
                      <BiMoon />
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
