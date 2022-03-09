import React from "react";
import DropDown from "../../commons/Dropdown";

function DropdownField({ label, text, isRequired, subText = null, options = [] }) {
  return (
    <div className="flex w-full flex-col py-4 px-2">
      <label for={label} className="inline-flex mb-2 text-sm text-gray-800 capitalize">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <DropDown tabIndex={0} id={label} options={options} select={options[0]} />
      {subText && <p className="text-gray-500 text-xs italic mt-1 ml-1">{subText}</p>}
    </div>
  );
}

export default DropdownField;
