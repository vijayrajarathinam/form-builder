import React from "react";

function CheckBoxField({ label, text, isRequired, error, onInputChange }) {
  return (
    <div className="form-check w-full px-3 py-5">
      <input
        className={`form-check-input appearance-none h-4 w-4 border ${
          error[label] ? "border-red-500" : "border-gray-300"
        } rounded-sm bg-white ${
          error[label] ? " checked:bg-red-600 checked:border-red-600" : " checked:bg-blue-600 checked:border-blue-600"
        } focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
        // className={`w-full px-3 py-2 text-gray-800 border  rounded outline-none bg-gray-50`}
        type="checkbox"
        name={label}
        onChange={onInputChange}
      />
      <label className="form-check-label inline-block text-gray-500 font-bold leading-tight capitalize" for={label}>
        {text} {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      {error[label] && <p className="text-red-500 text-xs italic mt-1 ml-1">{error[label]}</p>}
    </div>
  );
}

export default CheckBoxField;
