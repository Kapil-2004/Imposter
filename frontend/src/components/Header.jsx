import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signoutSuccess } from "../redux/user.slice";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/theme.slice";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

// console.log(location.pathname);

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [dropdown, setDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  console.log(activeTab);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const modeClickhandler = () => {
    dispatch(setTheme(theme === "dark" ? "Light" : "dark"));
    setDropdown(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileClickHandler = () => {
    setDropdown(!dropdown);
  };

  const signoutHandler = async () => {
    setActiveTab("");
    try {
      const signoutResponse = await axios.post(`${API_URL}/api/auth/signout`);

      if (signoutResponse.status === 200) {
        dispatch(signoutSuccess());
        setDropdown(false);
        navigate("/sign-in");
      }
    } catch (error) {}
  };
  const myPostHandler = () => {
    navigate("/posts/userposts");
    setDropdown(false);
    setActiveTab("");
  };

  return (
    <div
      className={`w-screen ${
        location.pathname.startsWith("/reset-password") && "hidden"
      } flex justify-between items-center py-4  fixed z-10 sm:px-7 px-2 dark:bg-background-dark bg-gray-200    bg shadow-sm shadow-indigo-700 dark:text-gray-200 text-textColor
  `}
    >
      <NavLink to="/">
        <h1
          onClick={() => setActiveTab("")}
          className="text-xl font-semibold flex items-center gap-1 "
        >
          {" "}
          <span className="text-2xl bg-indigo-800  dark:text-gray-300 text-gray-200 rounded-full px-[0.5rem]">
            Λ
          </span>
          nonymous
        </h1>
      </NavLink>

      <div className="flex  items-center relative gap-2 md:gap-3">
        <span
          onClick={modeClickhandler}
          className="flex ml-1  items-center gap-2"
        >
          {" "}
          {theme === "dark" ? (
            <CiSun className="text-xl " />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </span>
        <NavLink to="/about">
          <button
            onClick={() => {
              setDropdown(false);
              setActiveTab("about");
            }}
            className={`${
              activeTab === "about"
                ? "text-indigo-700"
                : " dark:text-gray-200 text-textColor"
            }  font-medium  dark:hover:text-indigo-700 hover:text-indigo-700 transition-all text-xs sm:text-sm`}
          >
            About
          </button>
        </NavLink>
        <NavLink to="/contact">
          <button
            onClick={() => {
              setDropdown(false);
              setActiveTab("feedback");
            }}
            className={` ${
              activeTab === "feedback"
                ? "text-indigo-700"
                : " dark:text-gray-200 text-textColor"
            } dark:hover:text-indigo-700 hover:text-indigo-500 font-medium text-xs sm:text-sm`}
          >
            Feedback
          </button>
        </NavLink>

        {currentUser ? (
          // <img
          //   onClick={profileClickHandler}
          //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2K1RhGUfKPoqfQRBcOKh85yJyf-5XILTo3Q&s"
          //   className="rounded-full size-8 cursor-pointer"
          //   alt="profile"
          // ></img>
          <h2
            onClick={profileClickHandler}
            className={`text-2xl bg-indigo-800  dark:text-gray-300 text-gray-200  px-[0.5rem] rounded-full cursor-pointer ${
              dropdown && " rotate-180 "
            } transition-all  font-semibold`}
          >
            Λ
          </h2>
        ) : (
          <NavLink to="/sign-in">
            <button
              onClick={() => setActiveTab("")}
              className="md:px-2 md:py-2 py-1 px-1 bg-indigo-600 text-sm rounded-md font-medium hover:bg-indigo-700 transition-all text-gray-200 hover:scale-95"
            >
              Login
            </button>
          </NavLink>
        )}

        <div
          className={`absolute top-14 border border-gray-300  dark:border-gray-600 right-0 flex bg-gray-200 dark:bg-indigo-900 rounded-md p-2   gap-2 transition-all duration-100 origin-top   ${
            dropdown ? "scale-y-100" : "scale-y-0"
          }  flex-col`}
        >
          <h1 className="text-sm  ">@{currentUser?.username}</h1>
          <div className="h-[0.7px] w-[95%] bg-gray-300 rounded-full mx-auto"></div>

          <p
            onClick={myPostHandler}
            className="text-sm font-medium hover:scale-95 pl-1 transition-all cursor-pointer"
          >
            My Posts
          </p>

          <div className="h-[0.7px] w-[95%] bg-gray-300 rounded-full mx-auto"></div>
          <div className="flex hover: cursor-pointer  items-center"></div>
          <div className="h-[0.7px] w-[95%] bg-gray-300 rounded-full mx-auto"></div>
          <button
            onClick={signoutHandler}
            className="px-2 py-2 bg-indigo-600 text-sm rounded-md font-medium text-gray-200 hover:bg-indigo-700 transition-all hover:scale-95"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
