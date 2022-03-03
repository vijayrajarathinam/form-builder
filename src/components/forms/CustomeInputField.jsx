import React from "react";
import DropDown from "../commons/Dropdown";

function CustomeInputField({ label, text, type, defaultChecked = false, options = [], onClick }) {
  let input = <div></div>;

  if (type == "text" || type == "number" || type == "file") {
    input = (
      <div className="flex w-full flex-col mb-2" onClick={onClick}>
        <label for={label} className="inline-flex mb-2 text-sm text-gray-800">
          {text}
        </label>
        <input
          name={label}
          type={type}
          disabled={true}
          className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50"
        />
      </div>
    );
  } else if (type == "dropdown") {
    input = <DropDown options={options} select={options[0]} onClick={onClick} />;
  } else if (type == "checkbox") {
    input = (
      <div className="form-check px-3" onClick={onClick}>
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
      <div class="flex justify-center" onClick={onClick}>
        {options.map((option, i) => (
          <div class="form-check form-check-inline">
            <input
              class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name={label.name}
              id={label.id}
              value={option.value}
            />
            <label class="form-check-label inline-block text-gray-800" for={label.id}>
              {text}
            </label>
          </div>
        ))}
        {/* <div class="form-check form-check-inline">
        <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
        <label class="form-check-label inline-block text-gray-800" for="inlineRadio20">2</label>
      </div> */}
        {/* <div class="form-check form-check-inline">
        <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
        <label class="form-check-label inline-block text-gray-800 opacity-50" for="inlineRadio30">3 (disabled)</label>
      </div> */}
      </div>
    );
  }
  return input;
}

export default CustomeInputField;

const options = [
  {
    id: 5,
    name: "Radio Buttons",
    value: "radio",
  },
];
