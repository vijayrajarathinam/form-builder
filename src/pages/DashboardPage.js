import clsx from "clsx";
import React, { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  LibraryIcon,
  NewspaperIcon,
  UserGroupIcon,
  ChatAlt2Icon,
  CreditCardIcon,
  ExclamationIcon,
  CogIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";
import { ArrowSmRightIcon, XCircleIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/commons/Header";
import { ThemeContext } from "../contextProvider/ThemeContextProvider";
// import Image from "../components/commons/Image";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import Button from "../components/commons/Button";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const sidebarItems = [
  [
    { id: "0", title: "Dashboard", icon: LibraryIcon, notifications: false, route: "/" },
    { id: "1", title: "Courses", icon: NewspaperIcon, notifications: false, route: "/" },
    { id: "2", title: "Learners", icon: UserGroupIcon, notifications: false, route: "/" },
    { id: "3", title: "Comments", icon: ChatAlt2Icon, notifications: 6, route: "/" },
  ],
  [
    { id: "4", title: "Payment", icon: CreditCardIcon, notifications: false, route: "/" },
    { id: "5", title: "Upcoming Activities", icon: ExclamationIcon, notifications: false, route: "/" },
    { id: "6", title: "Settings", icon: CogIcon, notifications: false, route: "/settings" },
  ],
];

const Dashboard = ({ user }) => {
  const [showSidebar, onSetShowSidebar] = useState(false);

  return (
    <div className="flex bg-white text-gray-600 dark:text-[#676767] dark:bg-[#1e1e1e]">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        user={user}
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
};

function Sidebar({ onSidebarHide, showSidebar }) {
  const [selected, setSelected] = useState("0");
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 bg-[#f8f8f8] dark:bg-[#181818] border-r border-[#e7e7e7] dark:border-[#181818]",
        showSidebar ? "flex" : "hidden"
      )}
      style={{ zIndex: 1 }}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start px-2 py-2.5 border-b border-b-[#e7e7e7] dark:border-b-[#2e2e2e]">
          <div className="block sm:hidden xl:block ml-2 py-1.5 font-bold text-xl text-[#777] dark:text-[#676767]">
            Melonin
          </div>
          <div className="flex-grow sm:hidden xl:block" />
          <IconButton icon={XCircleIcon} className="block sm:hidden w-8 h-8 cursor-pointer" onClick={onSidebarHide} />
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        {sidebarItems[0].map((i) => (
          <MenuItem key={i.id} item={i} onClick={setSelected} selected={selected} />
        ))}
        <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">SHORTCUTS</div>
        {sidebarItems[1].map((i) => (
          <MenuItem key={i.id} item={i} onClick={setSelected} selected={selected} />
        ))}
        <div className="flex-grow" />
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-between p-2 border-t border-t-[#e7e7e7] dark:border-t-[#2e2e2e]">
          <div className="block sm:hidden xl:block my-2 font-bold text-[#2e2e2e] dark:text-white ">Dark mode</div>
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              theme == "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={(e) => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="absolute left-0">
              <MoonIcon className="h-5 w-5 text-yellow-500" />
            </span>
            <motion.div className="w-5 h-5 bg-white rounded-full z-40" layout transition={spring} />
            <span className="absolute right-0.5">
              <SunIcon className="h-5 w-5 text-yellow-500" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function MenuItem({ item: { id, title, notifications, icon: Icon, route }, onClick, selected }) {
  return (
    <Link
      to={route}
      className={clsx(
        "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer border-r-2 hover:bg-[#ddd] dark:hover:bg-black",
        selected === id ? "text-[#777] dark:text-white border-r-[#777] dark:border-r-white" : "border-r-transparent"
      )}
    >
      <Icon className="w-5 h-5" />
      <div className="block sm:hidden xl:block ml-2">{title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
      {notifications && (
        <div className="flex sm:hidden xl:flex bg-pink-600  w-5 h-5 items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
    </Link>
  );
}

const steps = [
  {
    text: "<strong>Menu Items</strong> helps us to redirect ",
    start: { y: 130, x: 250 },
    stop: { y: -130, x: 250 },
  },
  {
    text: "You can toggle between <strong>dark</strong> and <strong>light</strong> mode ",
    start: { y: 620, x: 250 },
    stop: { y: -620, x: 250 },
  },
  {
    text: "We get <strong>notification</strong> on all the actions ",
    start: { y: 80, x: 1080 },
    stop: { y: -80, x: 1080 },
  },
  {
    text: "Have control over your information in <strong>Profile section</strong>",
    start: { y: 80, x: 1180 },
    stop: { y: -80, x: 1180 },
  },
];

function Content({ user, onSidebarHide }) {
  const [step, setStep] = useState(0);
  const [show, setDisplay] = useState(true);
  const handleClose = () => setDisplay(false);
  const next = () => setStep((curr) => curr + 1);
  const props = { show, handleClose, next };

  return (
    <div className="flex w-full relative">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">.</div>
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start ">
        <Header user={user} IconButton={IconButton} onSidebarHide={onSidebarHide} />
        <div className="py-2 px-4 sm:px-10 w-full">
          <h1>Dashboard</h1>
        </div>
      </div>
      <UIGuide value={steps[step]} {...props} />
    </div>
  );
}

function IconButton({ onClick = () => {}, icon: Icon, className = "w-4 h-4" }) {
  return <Icon onClick={onClick} className={clsx(className, "text-gray-600")} />;
}

function UIGuide({ value, next, show, handleClose }) {
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.1]";
  function variants({ start, stop }) {
    return {
      start: { y: start.y, x: start.x, transition: { duration: 0.5 } },
      stop: { y: stop.y, x: stop.x, transition: { repeatDelay: 3 } },
    };
  }

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }}>
        <motion.section
          variants={variants(value)}
          animate={show ? "start" : "stop"}
          className="fixed rounded-sm bg-white w-1/5 h-auto shadow-material px-5 py-3"
        >
          <p dangerouslySetInnerHTML={{ __html: value.text }} />

          <div className="flex justify-between items-center px-0.5 mt-5">
            <Button.Default
              className="p-2 h-5 text-sm shadow-none 
              !bg-transparent !text-gray-500"
              style={{ padding: "0.25rem", height: "2rem" }}
              Icon={FastForwardIcon}
              text="Skip This Tour"
              onClick={() => handleClose()}
            />
            <Button.Primary
              className="p-2 h-5 text-sm shadow-none"
              style={{ padding: "0.25rem", height: "2rem" }}
              Icon={ArrowSmRightIcon}
              text="Next"
              onClick={() => next()}
            />
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
}

export default Dashboard;
