import React from "react";
import { Field } from "redux-form";

const renderError = ({ meta: { touched, error } }) => (touched && error ? <span>{error}</span> : false);

function RadioField({ text, label, input: { name }, isRequired, options = [] }) {
  return (
    <div class="flex flex-col w-full justify-center py-4 px-2">
      <label for={label} className="inline-flex mb-2 text-sm text-gray-800 capitalize">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <div className="flex gap-3 md:items-center flex-col md:flex-row">
        {options &&
          options.map((option, i) => (
            <div key={i} class="form-check form-check-inline ">
              <label>
                <Field name={label} text={name} component="input" type="radio" value={option.value} /> {option.name}
              </label>
            </div>
          ))}
      </div>
      <Field name={label} component={renderError} />
    </div>
  );
}

export default RadioField;
