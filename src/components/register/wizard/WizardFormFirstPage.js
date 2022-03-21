import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import middleware from "../components2";

const WizardFormFirstPage = ({ ...props }) => {
  const { handleSubmit, page, inputs, nextPage, previousPage, pristine, submitting } = props;

  //   console.log(inputs.struct.sections.length, page, inputs.struct.sections.length == page);
  return (
    <>
      {inputs.struct.sections.map((section, i) => {
        if (page == i + 1)
          return (
            <form
              onSubmit={inputs.struct.sections.length == page ? handleSubmit : nextPage}
              className="flex relative flex-col items-center gap-y-1 text-gray-500 p-3"
            >
              <h2 className="text-xl self-start capitalize">{section.name}</h2>
              {section.rows.map((row) => (
                <div className="flex flex-col md:flex-row items-center w-full text-gray-500">
                  {row.columns.map((props) => (
                    <Field
                      name={props.label}
                      type={props.type}
                      text={props.text}
                      label={props.text}
                      {...props}
                      component={({ ...props }) => {
                        return middleware(props);
                      }}
                    />
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-between mt-10 p-3 w-full">
                <button
                  type="button"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={previousPage}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  {...(inputs.struct.sections.length == page && { disabled: pristine || submitting })}
                >
                  Next
                </button>
              </div>
            </form>
          );
      })}
    </>
  );
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFirstPage);
