import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import middleware from "../components2";

// function validate(value) {
//   console.log(value);
// let err = {};
// const re =
//   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// for (let i = 0; i < inputs.length; i++) {
//   const input = inputs[i];
//   const value = data[input.label];

//   if (input.type == "email")
//     if (!value.toLowerCase().match(re)) err[input.label] = "Not a valid email";
//     else if (input.useAsUsername) setUsername(value);

//   if (input.type == "number" && input.isRequired && input.minValue <= value.length)
//     err[input.label] = `Value must be greater than ${input.minValue}`;
//   if (input.isRequired && value == "") err[input.label] = "This Field cannot be empty";
// }
// console.log(err);
// setError(err);
// }

// export default reduxForm({
// form: "wizard",
// destroyOnUnmount: false,
// forceUnregisterOnUnmount: true,
// validate, //: ({ ...props }) => console.log(props),
// })(f
export default function WizardForm({ ...props }) {
  const { inputs } = props;
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((page) => page + 1);
  return (
    <>
      {inputs.struct.sections.map((section, i) => {
        if (page == i + 1)
          return (
            <Form {...props} page={page} onSubmit={nextPage} setPage={setPage} section={section} inputs={inputs} />
          );
      })}
    </>
  );
}
// );

const Form = reduxForm({
  form: "form",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(function ({ ...props }) {
  const previousPage = () => setPage((page) => (page > 1 ? page - 1 : page));

  const { handleSubmit, inputs, section, pristine, submitting, page, setPage } = props;
  return (
    <form
      // onSubmit={inputs.struct.sections.length == page ? handleSubmit : nextPage}
      onSubmit={handleSubmit}
      className="flex relative flex-col items-center gap-y-1 text-gray-500 p-3"
    >
      <h2 className="text-xl self-start capitalize">{section.name}</h2>
      {section.rows.map((row) => (
        <div className="flex flex-col md:flex-row items-center w-full text-gray-500">
          {row.columns.map((props) => (
            <Field name={props.label} type={props.type} label={props.text} {...props} component={middleware} />
          ))}
        </div>
      ))}
      <div className="flex items-center justify-between mt-10 p-3 w-full">
        <button
          type="button"
          // onClick={nextPage}
          className={`py-2.5 px-5 mr-2 mb-2 ${
            page == 1 ? "cursor-not-allowed" : "cursor-pointer"
          } text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ${
            page != 1 &&
            "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          }  dark:bg-gray-800 dark:text-gray-400 `}
          onClick={previousPage}
        >
          Prev
        </button>
        <button
          type="submit"
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          {...(inputs.struct.sections.length == page && { disabled: pristine || submitting })}
        >
          {inputs.struct.sections.length == page ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
});
