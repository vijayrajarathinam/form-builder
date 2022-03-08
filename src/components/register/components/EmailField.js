import React from "react";

function EmailField() {
  return (
    <div className="flex w-full flex-col py-4 px-2">
      <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
        First Name
        <span className="text-red-500 pl-1">*</span>
      </label>
      <input
        name="name"
        type="email"
        className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50"
      />
      <p className="text-gray-500 text-xs italic mt-1 ml-1">As per addhaar card</p>
    </div>
  );
}

export default EmailField;
