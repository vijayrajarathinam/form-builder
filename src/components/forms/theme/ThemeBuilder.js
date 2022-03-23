import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { SaveIcon, SaveAsIcon, TrashIcon } from "@heroicons/react/outline";

import { motion, AnimatePresence } from "framer-motion";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import "./ThemeBuilder.css";
const spring = { type: "spring", stiffness: 700, damping: 30 };

export default function ({ handleClose, show }) {
  const [wizard, setWizard] = useState(false);
  const variants = {
    start: { y: 100, x: "-50%", transition: { duration: 0.5 } },
    stop: { y: -100, x: "-50%", transition: { repeatDelay: 3 } },
  };
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) handleClose(e);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }} onClick={handleClose}>
        <motion.section
          variants={variants}
          animate={show ? "start" : "stop"}
          className="p-4 fixed rounded-sm bg-[#e7e6eb] w-3/4 md:w-1/3 h-auto left-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center my-4">
            <p className="text-xl font-semibold text-[#533868]">Themes Settings</p>
            {/* <button onClick={handleClose}>
              <XIcon className="w-6 h-6 text-gray-600" />
            </button> */}
          </div>

          <div
            className="overflow-y-scroll rounded-xl divide-y-4 bg-white flex flex-col  scrollbar-hide"
            style={{ height: "27rem" }}
          >
            <div className="flex w-full flex-col py-4 px-4">
              <label
                for="name"
                className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
              >
                Form Name
                {/* <span className="text-red-500 pl-1">*</span> */}
              </label>
              <div>
                <input
                  name="name"
                  //   placeholder="form name"
                  type="text"
                  className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded outline-none bg-gray-50 placeholder-grey-50`}
                />
                {/* {touched && error && <p className="text-red-500 text-xs italic mt-1 ml-1">{error}</p>} */}
              </div>
            </div>
            <div className="flex items-center p-4 ">
              <div className="grow">
                <label for="text" className="inline-flex capitalize text-[#7c7a8a] font-bold md:text-right pr-4">
                  Page Background
                </label>
              </div>
              <div className="">
                <input
                  name="background_color"
                  // value={input.text}
                  // onChange={onInputChange}
                  type="color"
                  value="#ffffff"
                  className="w-[25px] h-[25px] p-0.5  outline-none focus:outline-none focus:bg-white "
                  tabIndex="0"
                />
              </div>
            </div>
            <div className="flex items-center p-4 hover:bg-black/5 ">
              <div className="grow">
                <label
                  for="text"
                  className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                >
                  Title Color
                </label>
              </div>
              <div className="">
                <input
                  name="color"
                  // value={input.text}
                  // onChange={onInputChange}
                  type="color"
                  className="w-[25px] h-[25px] p-0.5  outline-none focus:outline-none focus:bg-white"
                  tabIndex="0"
                />
              </div>
            </div>
            <div className="flex items-center p-4 ">
              <div className="grow">
                <label
                  for="text"
                  className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                >
                  Wizard
                </label>
              </div>
              <div
                className={`bg-[#e4e3e8] flex items-center px-0.5 rounded-full h-6 w-10 cursor-pointer flex-shrink-0 relative ${
                  wizard ? "justify-end bg-blue-500" : "justify-start bg-white"
                }`}
                onClick={(e) => setWizard((w) => !w)}
              >
                <span className="absolute left-0" />
                <motion.div className="w-5 h-5 shadow-material bg-white rounded-full z-40" layout transition={spring} />
                <span className="absolute right-0.5" />
              </div>
            </div>
          </div>
          {/* <div className="flex mt-5 gap-x-2">
            <button
              //   onClick={preModalSubmit}
              className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <SaveIcon className="w-4 h-4" />
              Save
            </button>

            <button
              //   onClick={preModalSubmitAndContinue}
              className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <SaveAsIcon className="w-4 h-4" />
              Save And Continue
            </button>
            <button className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
              <TrashIcon className="w-4 h-4" />
              Remove
            </button>
          </div>
        */}
        </motion.section>
      </div>
    </AnimatePresence>
  );
}
