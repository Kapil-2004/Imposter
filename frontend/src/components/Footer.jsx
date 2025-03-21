import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className={` mt-3 h-[5rem] ${
        location.pathname.startsWith("/reset-password") && "hidden"
      }   border-t border-indigo-800 dark:bg-gray-600 dark:bg-opacity-30 flex items-center flex-col gap-2  justify-center px-2  bg-indigo-800     `}
    >
      <h1 className="text-gray-200 text-center text-sm font-medium">
        Created by Mradul
      </h1>
      <div className="flex gap-2 text-lg text-gray-100">
        <a target="_blank" href="https://github.com/Mradul999">
          <FaGithub className="hover:text-indigo-700 transition-all cursor-pointer" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mradul-verma-b74048254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        >
          <FaLinkedin className="hover:text-indigo-700 transition-all cursor-pointer" />
        </a>
        <a target="_blank" href="https://www.instagram.com/catsaredramatic99/">
          <FaInstagram className="hover:text-indigo-700 transition-all cursor-pointer" />
        </a>
      </div>

      <div></div>
    </div>
  );
};

export default Footer;
