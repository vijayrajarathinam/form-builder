import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Header from "./Header";

const flow = {
  start: {
    width: 0,
  },
  end: { width: "100%" },
};

function Content({ user, content: Body, onSidebarHide }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div animate={flow} initial="start" animate="end" className="flex w-full">
        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">.</div>
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start ">
          <Header user={user} IconButton={IconButton} onSidebarHide={onSidebarHide} />
          <div className="py-2 px-4 sm:px-10 w-full">
            <Body />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function IconButton({ onClick = () => {}, icon: Icon, className = "w-4 h-4" }) {
  return <Icon onClick={onClick} className={clsx(className, "text-gray-600")} />;
}

export default Content;
