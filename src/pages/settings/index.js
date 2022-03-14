import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  UserCircleIcon,
  ServerIcon,
  LockClosedIcon,
  EyeIcon,
  SupportIcon,
  InformationCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Breadcrumb from "../../components/commons/Breadcrumb";
import { Link } from "react-router-dom";

const settings = [
  { link: "#", name: "General", text: "Edit your profile details", Icon: UserCircleIcon },
  { link: "/settings/formbuilder", text: "Build registration forms", name: "Form Builder", Icon: ServerIcon },
  { link: "#", name: "Appearance", text: "Manage your visibility", Icon: EyeIcon },
  { link: "#", name: "Privacy & Security", text: "You're in control of your data", Icon: LockClosedIcon },
  { link: "#", name: "Help and Support", text: "Get additional support", Icon: SupportIcon },
  { link: "#", name: "About", text: "Know more about Melonin", Icon: InformationCircleIcon },
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

      <div class="mt-6 w-full flex items-center h-15 bg-white rounded px-1 py-2 shadow-material">
        <SearchIcon className="h-8 w-8 p-1 mx-2" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a setting..."
          className="h-full w-full outline-none"
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
          {getSettings().map(({ Icon, name, text, link }, i) => (
            <Link
              key={i}
              to={link}
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 text-gray-400 hover:text-blue-400 "
            >
              <article className="overflow-hidden my-1 rounded shadow-material hover:bg-gray-50">
                <Icon className="p-1 h-[100px] w-full " />

                <header className="flex flex-col items-center justify-between leading-tight p-2 md:p-4 ">
                  <h1 className="text-xl">{name}</h1>
                  <p className="text-sm ">{text}</p>
                </header>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SettingsPage;
