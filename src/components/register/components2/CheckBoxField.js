import React from "react";
import { Field } from "redux-form";

const renderError = ({ meta: { touched, error } }) => (touched && error ? <span>{error}</span> : false);

function CheckBoxField({ text, label, isRequired }) {
  return (
    <div className="form-check w-full px-3 py-5">
      <Field name={label} id={label} component="input" type="checkbox" />
      <label htmlFor={label} className="ml-2">
        {text}
        {isRequired && <span className="text-red-500 pl-1">*</span>}
      </label>
      <Field name={label} component={renderError} />
    </div>
  );
}

export default CheckBoxField;
