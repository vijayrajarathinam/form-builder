import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import DropDown from "../commons/Dropdown";
import { SaveIcon, SaveAsIcon, TrashIcon } from "@heroicons/react/outline";
import LogicTable from "./LogicTable";
import useMediaQuery from "../../hooks/useMediaQuery";

const variants = {
  start: { y: 50, x: "-50%", transition: { duration: 0.5 } },
  stop: { y: -50, x: "-50%", transition: { repeatDelay: 3 } },
};

const options = [
  { id: 1, name: "Text Field", value: "text" },
  { id: 2, name: "Number Field", value: "number" },
  { id: 3, name: "Email Field", value: "email" },
  { id: 4, name: "Dropdown", value: "dropdown" },
  { id: 5, name: "Checkbox", value: "checkbox" },
  { id: 6, name: "Radio Buttons", value: "radio" },
  { id: 7, name: "File Upload Field", value: "file" },
];

const logicOptions = [
  { id: 1, name: "none", value: "none" },
  { id: 2, name: "show", value: "show" },
  { id: 3, name: "hide", value: "hide" },
];

const defaultItem = {
  label: "",
  text: "",
  type: "text",
  logic: { default: "none", and: [], or: [] },
  isRequired: false,
};

function FormItemCreate({ show, questions, item, onModalSubmit, handleClose }) {
  const isEmpty = Object.keys(item).length === 0;
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";
  const [input, setInput] = React.useState(isEmpty ? defaultItem : item);
  const [message, setMessage] = React.useState("");
  const isSmall = useMediaQuery("(min-width: 480px)");

  const variants = {
    start: { y: isSmall ? 50 : -10, x: "-50%", transition: { duration: 0.5 } },
    stop: { y: isSmall ? -50 : 0, x: "-50%", transition: { repeatDelay: 3 } },
  };

  function onInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "text") {
      const label = value.replace(/ /g, "_").toLowerCase();
      setInput((input) => ({ ...input, ["label"]: label, [name]: value }));
      return;
    }

    setInput((input) => ({ ...input, [name]: value }));
  }

  function addOption() {
    let opt = input.options || [];
    setInput((input) => ({
      ...input,
      ["options"]: [...opt, { name: "", value: "" }],
    }));
  }

  function deleteOption(index) {
    return (e) => {
      e.preventDefault();
      let opts = input.options;
      setInput((input) => ({
        ...input,
        ["options"]: opts.filter((opt, i) => (i === index ? false : true)),
      }));
    };
  }

  function setType({ value }) {
    setInput((input) => ({ ...input, ["type"]: value }));
  }

  function setDefaultLogic({ value }) {
    setInput((input) => ({ ...input, ["logic"]: { ...input.logic, ["default"]: value } }));
  }

  function addRow(e, title) {
    e.preventDefault();
    const object = { field: questions[0], value: questions[0].value };

    setInput((input) => ({
      ...input,
      ["logic"]: { ...input.logic, [title]: [...input.logic[title.toLowerCase()], object] },
    }));
  }

  function onLogicOptionChange(e, title, rowId) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInput((input) => ({
      ...input,
      ["logic"]: {
        ...input.logic,
        [title]: input.logic[title].map((_, rId) => {
          return rowId == rId ? { ..._, ["field"]: questions.find((question) => question.label === value) } : _;
        }),
      },
    }));
  }
  function onValueChange(e, title, rowId) {
    const target = e.target;
    const value = target.value;
    console.log(value);
    setInput((input) => {
      console.log({
        ...input,
        ["logic"]: {
          ...input.logic,
          [title]: input.logic[title].map((_, rId) => {
            return rowId == rId ? { ..._, ["value"]: "" + value } : _;
          }),
        },
      });
      return {
        ...input,
        ["logic"]: {
          ...input.logic,
          [title]: input.logic[title].map((_, rId) => {
            return rowId == rId ? { ..._, ["value"]: "" + value } : _;
          }),
        },
      };
    });
  }
  function deleteRow(title, rowId) {
    setInput((input) => ({
      ...input,
      ["logic"]: {
        ...input.logic,
        [title]: input.logic[title].filter((_, rId) => {
          return rowId == rId ? false : true;
        }),
      },
    }));
  }

  function onOptionChange(index) {
    return (e) => {
      const { name, value } = e.target;
      let opts = input.options;

      setInput((input) => ({
        ...input,
        ["options"]: opts.map((opt, i) => {
          return i === index ? { ...opt, [name]: value } : opt;
        }),
      }));
    };
  }

  const MessageAndSend = (str, bool) => {
    setMessage(str);
    return bool;
  };
  function validate() {
    const { type, text, label } = input;

    if (text === "") return MessageAndSend("Question is mandatory", false);
    if (label === "") return MessageAndSend("Label is mandatory", false);

    if (type == "dropdown" || type == "radio") {
      //type == "checkbox" ||
      if (typeof input.options != "undefined" && input.options.length !== 0) return MessageAndSend("", true);
      else return MessageAndSend("Options are mandatory", false);
    }
    // if (type == "number") {
    //   if (typeof input.minValue != "undefined" && input.minValue === "") return MessageAndSend("", true);
    //   else return MessageAndSend("Minimum value is mandatory", false);
    // }

    return MessageAndSend("", true);
  }

  const preModalSubmit = () => validate() && onModalSubmit(input);
  const preModalSubmitAndContinue = () => validate();

  const renderSwitch = () => {
    switch (input.type) {
      case "dropdown":
        return displayOptions();
      case "checkbox":
        return displayOptions();
      case "radio":
        return displayOptions();
      case "number":
        return displayNumberOptions();
      default:
        return displaySubtext();
    }
  };

  function displaySubtext() {
    return (
      <div className="md:flex md:items-center px-2 py-5 ">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Sub Text:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="inline-full-name"
            type="text"
            name="subText"
            value={input.subText}
            onChange={onInputChange}
            tabIndex="1"
          />
        </div>
      </div>
    );
  }

  function displayNumberOptions() {
    return (
      <div className="md:flex md:items-center px-2 py-5 ">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Min Value:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="inline-full-name"
            type="text"
            name="minValue"
            value={input.minValue || 0}
            onChange={onInputChange}
            tabIndex="1"
          />
        </div>
      </div>
    );
  }
  function displayOptions() {
    return (
      <div className="px-4 py-5">
        <button
          className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline float-right"
          onClick={addOption}
        >
          Add option
        </button>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {input?.options?.map((option, i) => (
              <tr>
                <td>
                  <input
                    className="w-auto px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50"
                    value={option.name}
                    name="name"
                    onChange={onOptionChange(i)}
                  />
                </td>
                <td>
                  <input
                    className="w-auto px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50"
                    value={option.value}
                    name="value"
                    onChange={onOptionChange(i)}
                  />
                </td>
                <td>
                  <button
                    onClick={deleteOption(i)}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
          <div className="overflow-y-scroll scrollbar-hide h-[27rem]">
            <div className="flex flex-col items-start gap-5 my-5 h-auto">
              {message.length != 0 && <p className="text-red-500 text-xs w-full italic mt-3 text-center">{message}</p>}
              <div className="md:flex md:items-center px-2 ">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
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
                    tabIndex="0"
                  />
                </div>
              </div>
              <div className="flex md:px-3 md:w-2/3 flex-col ">
                <label for="text" className="inline-flex font-bold mb-2 text-gray-500">
                  Enter Your question....
                </label>
                <input
                  name="text"
                  value={input.text}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 border rounded outline-none leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  tabIndex="0"
                />
              </div>
              <div className="md:flex w-1/2 pl-3 md:items-center ">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="input-type">
                    Input Type
                  </label>
                </div>
                <div className="md:w-2/3">
                  <DropDown
                    options={options}
                    select={options.find((opt) => opt.value === input.type)}
                    onChange={setType}
                  />
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
                  {renderSwitch()}
                </details>
                <details>
                  <summary className="bg-gray-200 text-gray-500 font-bold py-3 px-4 cursor-pointer select-none w-full">
                    Logic
                  </summary>
                  <div className="p-2">
                    <div className="flex w-full md:w-1/2 pl-3 items-center ">
                      {/* <div className="md:w-2/4"> */}
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="input-type">
                        Default Visibility
                      </label>
                      {/* </div> */}
                      {/* <div className="md:w-2/4"> */}
                      <DropDown
                        options={logicOptions}
                        select={logicOptions.find((opt) => opt.value === input.logic.default)}
                        onChange={setDefaultLogic}
                      />
                      {/* </div> */}
                    </div>
                    {/* table and */}
                    <LogicTable
                      title="and"
                      addRow={addRow}
                      deleteRow={deleteRow}
                      onLogicOptionChange={onLogicOptionChange}
                      rows={input.logic.and}
                      questions={questions}
                      onValueChange={onValueChange}
                    />
                    {/* table or */}
                    <LogicTable
                      title="or"
                      addRow={addRow}
                      deleteRow={deleteRow}
                      onLogicOptionChange={onLogicOptionChange}
                      rows={input.logic.or}
                      questions={questions}
                      onValueChange={onValueChange}
                    />
                  </div>
                </details>
              </div>
              {/* accordion ends*/}
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-2">
            <button
              onClick={preModalSubmit}
              className="inline-flex w-auto items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 md:py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <SaveIcon className="w-4 h-4" />
              Save
            </button>

            <button
              onClick={preModalSubmitAndContinue}
              className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 md:py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <SaveAsIcon className="w-4 h-4" />
              Save And Continue
            </button>
            <button className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 md:py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
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
