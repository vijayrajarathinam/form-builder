import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as outlineIcon from "@heroicons/react/outline";
import Breadcrumb from "../../components/commons/Breadcrumb";

const {
  EyeIcon,
  ServerIcon,
  SearchIcon,
  SupportIcon,
  UserCircleIcon,
  LockClosedIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} = outlineIcon;

const settings = [
  { link: "#", name: "General", text: "Edit your profile details", icon: "UserCircleIcon", Icon: UserCircleIcon },
  {
    link: "/settings/formbuilder",
    text: "Build registration forms",
    name: "Form Builder",
    icon: "ServerIcon",
    Icon: ServerIcon,
  },
  { link: "#", name: "Appearance", text: "Manage your visibility", icon: "EyeIcon", Icon: EyeIcon },
  {
    link: "#",
    name: "Privacy & Security",
    text: "You're in control of your data",
    icon: "LockClosedIcon",
    Icon: LockClosedIcon,
  },
  { link: "#", name: "Help and Support", text: "Get additional support", icon: "SupportIcon", Icon: SupportIcon },
  {
    link: "#",
    name: "About",
    text: "Know more about Melonin",
    icon: "InformationCircleIcon",
    Icon: InformationCircleIcon,
  },
];

function SettingsPage() {
  const [search, setSearch] = useState("");

  function getSettings() {
    if (search === "") return settings;
    return settings.filter((setting) => setting.name.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <motion.div initial={{ x: "300px", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-300px", opacity: 0 }}>
      <Breadcrumb
        crumbs={[
          { link: "/", text: "dashboard" },
          { link: "/settings", text: "settings" },
        ]}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div class="mt-6 w-full flex items-center h-15 bg-white dark:bg-[#181818] rounded px-1 py-2 shadow-material">
        <SearchIcon className="h-8 w-8 p-1 mx-2 dark:text-white" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a setting..."
          className="h-full w-full outline-none dark:bg-[#181818]"
        />
      </div>
      <div class="block md:hidden mt-6 w-full bg-white rounded py-2 px-1 shadow-material">
        <ul class="divide-y-2 divide-gray-100">
          {getSettings().map(({ Icon, name, link }, i) => (
            <Link key={i} to={link} class="p-3 flex items-center cursor-pointer">
              <Icon className="h-8 w-8" />
              <h3 className="flex-grow ml-5">{name}</h3>
              <ChevronRightIcon className="h-6 w-6" />
            </Link>
          ))}
        </ul>
      </div>

      <div className="hidden md:block container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {getSettings().map((props, i) => (
            <SettingsCard key={i} i={i} {...props} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SettingsCard({ Icon, name, text, link, i, ...props }) {
  const icon = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    const animationMenu = lottie.loadAnimation({
      container: icon.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: require(`./icons/${props.icon}.json`),
      // path: "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/calendar.json",
    });

    var directionMenu = 1;
    container.current.addEventListener("mouseenter", (e) => {
      animationMenu.setDirection(directionMenu);

      animationMenu.play();
    });

    container.current.addEventListener("mouseleave", (e) => {
      animationMenu.setDirection(-directionMenu);
      animationMenu.play();
    });
  }, []);

  return (
    <Link
      key={i}
      to={link}
      className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 text-black hover:text-black/50 dark:text-white"
      ref={container}
    >
      <article className="overflow-hidden my-1 rounded shadow-material dark:bg-[#181818] hover:bg-gray-50">
        {/* <ChevronRightIcon className="p-1 h-[100px] w-full " /> */}
        <div className="p-1 h-[100px] w-full " ref={icon} />
        <header className="flex flex-col items-center justify-between leading-tight p-2 md:p-4 ">
          <h1 className="text-xl">{name}</h1>
          <p className="text-sm ">{text}</p>
        </header>
      </article>
    </Link>
  );
}

export default SettingsPage;
