import React from "react";
import { useSelector } from "react-redux";
import { Field } from "redux-form";

function DropdownField({ label, text, meta: { touched, error }, isRequired, subText = null, options = [], ...props }) {
  const { logic } = props;
  // console.log(logic);

  const form = useSelector((state) => state.form.form);
  React.useEffect(() => {
    Object.keys(form?.registeredFields || {}).length < 0 &&
      logic?.and?.forEach((an) => {
        console.log(an);

        let label = an.field.label;
        let value = an.field.value;
        if (form.values[label] && form.values[label] == value) console.log("true");
        else console.log("false");
      });
    // console.log(logic.and);
  }, [form]);

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
          [{ name: "", value: "" }, ...options].map((option) => <option value={option.value}>{option.name}</option>)}
      </Field>
      {subText && <p className="text-gray-500 text-xs italic mt-1 ml-1">{subText}</p>}
    </div>
  );
}

export default DropdownField;
