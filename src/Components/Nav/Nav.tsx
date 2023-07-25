import { useRef, useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState(null);

  const inputFile = useRef(null);
  const navigate = useNavigate();
  const [changeProfile, setChangeProfile] = useState(false);
  const [tools, setTools] = useState(false);
  const onFileSelected = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };
  const onButtonClick = () => {
    inputFile.current?.click();
  };
  const { mutate } = useMutation({
    mutationFn: () =>
      uploadUserProfilePhoto(
        auth.currentUser.uid,
        inputFile?.current?.files?.[0]!
      ),
    onSuccess: async () => {
      console.log("changed successfully");
      location.reload();
    },
  });
  const { data, status } = useQuery({
    queryKey: ["getUserWithId"],
    queryFn: () => getUserById(auth.currentUser?.uid),
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
                    e.target.disabled = true;
                  }}
                >
                  Save
                </button>
                <button
                  className="p-2 px-4 rounded-md bg-yellow-950 text-yellow-500"
                  onClick={onButtonClick}
                >
                  Select other photo
                </button>
                <button
                  className="p-2 px-4 rounded-md text-red-500 bg-red-950 bg-opacity-50"
                  onClick={() => {
                    inputFile.current.value = null;
                    setSelectedImage(null);
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
                    data.profile_photo
                      ? data.profile_photo
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
                        data.profile_photo
                          ? data.profile_photo
                          : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                      }
                      className=" w-12 h-12 rounded-full object-cover cursor-pointer"
                    />
                    {changeProfile && (
                      <button
                        onClick={onButtonClick}
                        className="z-40 absolute top-12 left-8 rounded-md bg-slate-950 p-2"
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
                      <p className="font-bold">{data.username}</p>
                      <p className="text-sm text-gray-400">
                        {data.type === "r" ? "Reader" : "Writer"}
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
