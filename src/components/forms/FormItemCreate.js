import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import DropDown from "../commons/Dropdown";
import { PlusCircleIcon, PresentationChartLineIcon, TrashIcon } from "@heroicons/react/outline";

const variants = {
  start: { y: 100, x: "-50%", transition: { duration: 0.5 } },
  stop: { y: -100, x: "-50%", transition: { repeatDelay: 3 } },
};

const options = [
  {
    id: 1,
    name: "Text Field",
    value: "text",
  },
  {
    id: 2,
    name: "Number Field",
    value: "number",
  },
  {
    id: 3,
    name: "Dropdown",
    value: "dropdown",
  },
  {
    id: 4,
    name: "Checkbox",
    value: "checkbox",
  },
  {
    id: 5,
    name: "Radio Buttons",
    value: "radio",
  },
  {
    id: 6,
    name: "File Upload Field",
    value: "file",
  },
];

const defaultItem = { label: "", text: "", type: "text", isRequired: false };

function FormItemCreate({ show, item, onModalSubmit, handleClose }) {
  const isEmpty = Object.keys(item).length === 0;
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";
  const [input, setInput] = React.useState(isEmpty ? defaultItem : item);

  function onInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }}>
        <motion.section variants={variants} animate={show ? "start" : "stop"} className="question-modal">
          <div className="flex items-center justify-between ">
            <p className="text-xl">Account</p>
            <button onClick={handleClose}>
              <XIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col items-start gap-5 my-5">
            <div className="md:flex md:items-center px-2 ">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Question Label:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="inline-full-name"
                  type="text"
                  name="label"
                  value={input.label}
                  onChange={onInputChange}
                  tabIndex="1"
                />
              </div>
            </div>
            <div className="flex md:px-3 md:w-2/3 flex-col ">
              <label for="question" className="inline-flex font-bold mb-2 text-gray-500">
                Enter Your question....
              </label>
              <input
                name="question"
                name="text"
                value={input.text}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 border rounded outline-none leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                tabIndex="1"
              />
            </div>
            <div className="md:flex w-1/2 pl-3 md:items-center ">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="input-type">
                  Input Type
                </label>
              </div>
              <div className="md:w-2/3">
                <DropDown options={options} select={options[0]} />
              </div>
            </div>
            <div className="form-check px-3">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                name="isRequired"
                value={input.isRequired}
                onChange={onInputChange}
                id="flexCheckDefault"
              />
              <label className="form-check-label inline-block text-gray-500 font-bold" for="flexCheckDefault">
                is Required
              </label>
            </div>
            {/* accordion starts*/}
            <div className=" w-full border border-gray-200 divide-y divide-gray-200">
              <details className="">
                <summary className="bg-gray-200 text-gray-500 font-bold py-3 px-4 cursor-pointer select-none w-full outline-none">
                  Field Specific
                </summary>
                <p className="pt-1 pb-3 px-4">
                  With the HTML5 <code className="text-sm text-red-500">details</code> element and some Tailwind for
                  showcase.
                </p>
              </details>
              <details>
                <summary className="bg-gray-200 text-gray-500 font-bold py-3 px-4 cursor-pointer select-none w-full">
                  Logic
                </summary>
                <p className="pt-1 pb-3 px-4">Of course. It's yours to use wherever and whenever you like.</p>
              </details>
            </div>
            {/* accordion ends*/}
          </div>

          <div className="flex gap-x-2">
            <button
              onClick={() => onModalSubmit(input)}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Add
            </button>

            {/* <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
            <DocumentTextIcon className="w-4 h-4" />
            Save
          </button> */}
            <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
              <PresentationChartLineIcon className="w-4 h-4" />
              Cancel
            </button>
            <button className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
              <TrashIcon className="w-4 h-4" />
              Remove
            </button>
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
}

export default FormItemCreate;
