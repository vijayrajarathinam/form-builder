import React from "react";

function RadioField({ label, text, isRequired, options = [], onInputChange }) {
  return (
    <div class="flex flex-col w-full justify-center py-4 px-2">
      <label for={label} className="inline-flex mb-2 text-sm text-gray-800 capitalize">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <div className="flex gap-3 md:items-center flex-col md:flex-row">
        {options &&
          options.map((option, i) => (
            <div class="form-check form-check-inline ">
              <input
                class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name={label}
                id={label}
                value={option.value}
                onChange={onInputChange}
              />
              <label class="form-check-label inline-block text-gray-800" for={option.name}>
                {option.value}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RadioField;
