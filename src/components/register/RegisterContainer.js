import React from "react";
import middleware from "./components";

function RegisterContainer({ data: { struct } }) {
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState({});

  const inputs = React.useMemo(() => {
    const obj = [];
    struct.sections.forEach((section) =>
      section.rows.forEach((row) => row.columns.forEach((props) => obj.push(props)))
    );
    return Object.keys(struct).length != 0 ? obj : {};
  }, [struct]);

  React.useEffect(() => {
    let obj = {};
    inputs.forEach((input) => (obj[input.label] = ""));
    setData(obj);
  }, []);

  function onInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setData((data) => ({ ...data, [name]: value }));
  }

  function onDropdownChange({ value, name = "" }) {
    setData((input) => ({ ...input, [name]: value }));
  }

  function validate() {
    let err = {};
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const value = data[input.label];

      if (input.type == "email" && !value.toLowerCase().match(re)) err[input.label] = "Not a valid email";
      if (input.type == "number" && input.isRequired && input.minValue <= value.length)
        err[input.label] = `Value must be greater than ${input.minValue}`;
      if (input.isRequired && value == "") err[input.label] = "This Field cannot be empty";
    }
    console.log(err);
    setError(err);
  }
  function onSubmit(e) {
    e.preventDefault();
    validate();
    console.log(data);
  }
  return (
    <div className="my-20 w-full max-w-50 mx-auto border border-gray-300 rounded-lg p-1 h-auto">
      <div className="flex flex-col bg-gray-100 items-center gap-y-5 text-gray-700 border border-gray-100 px-4 pt-4 pb-2">
        <h2 className="text-3xl">Register Page</h2>
        <p className="self-start text-sm">Please fill all the required fields</p>
      </div>

      {struct.sections.map((section) => (
        <div className="flex relative flex-col items-center gap-y-1 text-gray-500 p-3">
          <h2 className="text-xl self-start capitalize">{section.name}</h2>
          {section.rows.map((row) => (
            <div className="flex flex-col md:flex-row items-center w-full text-gray-500">
              {row.columns.map((props) =>
                middleware({
                  ...props,
                  error,
                  ["onInputChange"]: props.type === "dropdown" ? onDropdownChange : onInputChange,
                })
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-10 p-3">
        <button
          type="submit"
          onClick={onSubmit}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>

      <div className="flex items-center justify-between mt-10 p-3">
        <button
          type="button"
          class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Prev
        </button>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RegisterContainer;
