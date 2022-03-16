import React from "react";
// import DropDown from "../../commons/Dropdown";
import { Field } from "redux-form";

{
  /* <div>
<label>Favorite Color</label>
<div>
  <Field name="favoriteColor" component={select}>
    <option></option>
    <option value="ff0000">Red</option>
    <option value="00ff00">Green</option>
    <option value="0000ff">Blue</option>
  </Field>
</div> */
}
function DropdownField({ label, text, meta: { touched, error }, isRequired, subText = null, options = [] }) {
  return (
    <div className="flex w-full flex-col py-4 px-2">
      <label forHtml={label} className="inline-flex mb-2 text-sm text-gray-800 capitalize">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <Field
        name={label}
        component="select"
        className={`w-full px-3 py-2 text-gray-800 border ${
          touched && error && "border-red-500"
        } rounded outline-none bg-gray-50 placeholder-grey-50`}
      >
        {options &&
          [{ name: label, value: "" }, ...options].map((option, i) => (
            <option value={option.value}>{option.name}</option>
          ))}
      </Field>
      {subText && <p className="text-gray-500 text-xs italic mt-1 ml-1">{subText}</p>}
    </div>
  );
}

export default DropdownField;
