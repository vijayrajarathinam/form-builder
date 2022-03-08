import React from "react";

function TextField({ label, text, isRequired, subText = null }) {
  return (
    <div className="flex w-full flex-col py-4 px-2">
      <label for={label} className="inline-flex mb-2 text-sm text-gray-800 capitalize">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <input
        tabIndex={0}
        id={label}
        name={label}
        className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50"
      />
      {subText && <p className="text-gray-500 text-xs italic mt-1 ml-1">{subText}</p>}
    </div>
  );
}

export default TextField;
