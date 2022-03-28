import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { BellIcon, MenuIcon } from "@heroicons/react/solid";
import { auth } from "../../firebase";
import Image from "./Image";

const Modal = ({ handleClose, show, username }) => {
  const variants = {
    start: { y: -30, transition: { duration: 0.5 } },
    stop: { y: 0, transition: { repeatDelay: 3 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        animate={show ? "stop" : "start"}
        className={` ${
          show ? "flex" : "hidden"
        } absolute p-2.5 bg-gray-50 flex-col items-center -right-[1rem] top-[3.5rem] mt-1 z-10 w-[280px] min-h-[80px] overflow-y-scroll text-base list-none rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
        style={{ border: "1px solid #ccc" }}
        onMouseEnter={(e) => {
          e.preventDefault();
          handleClose(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          handleClose(false);
        }}
      >
        {/* <p className="text-[#202124] tracking-tighter m-0 overflow-hidden inline-block text-ellipsis font-bold text-lg">
          Username
        </p> */}

        <p className="leading-tight mb-3 tracking-tight text-ellipsis overflow-hidden text-[#5f6368] font-normal text-[.875rem]">
          {username}
        </p>

        <button
          onClick={() => signOut(auth)}
          className="text-gray-500 mt-1 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase px-8 py-2 rounded-xl outline-none focus:outline-none  ease-linear transition-all duration-150"
          type="button"
        >
          Logout
        </button>
        <div class="mt-3 flex items-center justify-evenly gap-x-2">
          <a
            href="#"
            className="leading-tight tracking-tight text-ellipsis overflow-hidden text-[#5f6368] font-normal text-[.875rem]"
          >
            Privacy Policy
          </a>
          <span class="seperator">•</span>
          <a
            href="#"
            className="leading-tight tracking-tight text-ellipsis overflow-hidden text-[#5f6368] font-normal text-[.875rem]"
          >
            Terms of Service
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

function Header({ IconButton, onSidebarHide }) {
  const [user, setUser] = useState({});
  const [show, onModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <div
      className={`px-3.5 py-0 flex justify-evenly w-full bg-[#f8f8f8] dark:bg-[#181818] items-center border-b-1 border-b-[#e7e7e7] dark:border-b-black/[.06] shadow-material`}
    >
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between">
          <IconButton icon={MenuIcon} className="block sm:hidden w-7 h-7 cursor-pointer" onClick={onSidebarHide} />
        </div>
      </div>
      <div className="flex-grow pr-5 pl-10 py-2" />
      <div className="flex justify-evenly items-center gap-5">
        <div className="relative px-3 py-2">
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <div className="absolute top-0 right-1.5 cursor-pointer bg-red-600 text-white rounded-xl px-1.5 text-sm font-bold">
            5
          </div>
        </div>
        <div
          className={`flex justify-between items-center gap-3 bg-[#f8f8f8] dark:bg-[#171717] px-3 py-2 rounded-lg cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            onModal((s) => !s);
          }}
        >
          <div className="relative h-15 w-15 lg:mx-auto border-pink-500 border-4 rounded-full">
            <Image
              className="rounded-full bg-black cursor-pointer hover:opacity-75"
              src={`https://avatars.dicebear.com/api/pixel-art/${user?.email || "user"}.svg`}
              layout="fill"
            />
            <Modal show={show} handleClose={() => onModal} username={user?.email || "user"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
