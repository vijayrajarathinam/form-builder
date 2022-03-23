import React from "react";
import { useSelector } from "react-redux";
function TextField({ text, input, isRequired, label, type, meta: { touched, error }, ...props }) {
  const { logic } = props;
  const form = useSelector((state) => state.form.form);

  const andDisplay = React.useMemo(() => {
    let notValid = true;
    if (logic?.and.length !== 0 && form?.values) {
      for (let an of logic.and) {
        let value = an.value,
          label = an.field.label;
        if (form.values[label] && form.values[label] == value) notValid = false;
        else notValid = true;
      }
    }
    return logic?.and.length !== 0 ? notValid : !notValid;
  }, [form]);

  const orDisplay = React.useMemo(() => {
    let notValid = true;
    if (logic?.or.length !== 0 && form?.values) {
      for (let an of logic.or) {
        let value = an.value,
          label = an.field.label;
        if (form.values[label] && form.values[label] == value) return false;
        else notValid = true;
      }
    }
    return logic?.or.length !== 0 ? notValid : !notValid;
  }, [form]);

  const render = () => (
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

  console.log(logic.default, !andDisplay, !orDisplay);
  if (logic.default == "hide")
    if (!andDisplay && !orDisplay) return render();
    else return <></>;
  else return render();
}

export default TextField;
