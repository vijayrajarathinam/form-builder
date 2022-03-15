import React from "react";

function EmailField({ text, input, isRequired, label, type, meta: { touched, error } }) {
  return (
    <div className="flex w-full flex-col py-4 px-2">
      <label for={label} className="inline-flex mb-2 text-sm text-gray-800 capitalize">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={`w-full px-3 py-2 text-gray-800 border ${
            touched && error && "border-red-500"
          } rounded outline-none bg-gray-50 placeholder-grey-50`}
        />
        {touched && error && <p className="text-red-500 text-xs italic mt-1 ml-1">{error}</p>}
      </div>
    </div>
  );
}

export default EmailField;
