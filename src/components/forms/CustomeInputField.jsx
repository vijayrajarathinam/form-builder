import React from "react";
import DropDown from "../commons/Dropdown";

function CustomeInputField({
  label,
  text,
  type,
  isRequired,
  subText = null,
  defaultChecked = false,
  options = [],
  onClick,
}) {
  let input = <div></div>;

  if (type == "text" || type == "email" || type == "number" || type == "file") {
    input = (
      <div className="flex w-full flex-col mb-2" onClick={onClick}>
        <label for={label} className="inline-flex mb-2 text-sm text-gray-800">
          {text}
          {isRequired ? <span className="text-red-500 pl-1">*</span> : <span />}
        </label>
        <input
          name={label}
          type={type}
          disabled={true}
          className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50"
        />
        {subText && <p className="text-gray-500 text-xs italic mt-1 ml-1">{subText}</p>}
      </div>
    );
  } else if (type == "dropdown") {
    input = (
      <div className="w-full" onClick={onClick}>
        <DropDown options={options} select={options[0]} onClick={null} />
      </div>
    );
  } else if (type == "checkbox") {
    input = (
      <div className="form-check w-full px-3" onClick={onClick}>
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          value={defaultChecked}
          name={label}
        />
        <label className="form-check-label inline-block text-gray-500 font-bold" for={label}>
          {text}
        </label>
      </div>
    );
  } else if (type == "radio") {
    input = (
      <div class="flex flex-col w-full justify-center" onClick={onClick}>
        <label for={label} className="inline-flex mb-2 text-sm text-gray-800">
          {text}
        </label>
        {options.map((option, i) => (
          <div class="form-check form-check-inline flex">
            <input
              class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name={text}
              id={label.id}
              value={option.value}
            />
            <label class="form-check-label inline-block text-gray-800" for={option.name}>
              {option.value}
            </label>
          </div>
        ))}
      </div>
    );
  }
  return input;
}

export default CustomeInputField;
