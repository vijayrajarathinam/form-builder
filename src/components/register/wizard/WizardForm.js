import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import validate from "./validate";
import middleware from "../components2";
import { SubmissionError } from "redux-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { register } from "../../../api/userApi";
import { auth } from "../../../firebase";

export default function WizardForm({ ...props }) {
  const { inputs } = props;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    status != inputs.formStatus && setStatus(inputs.formStatus);
  }, [inputs.formStatus]);

  const [page, setPage] = useState(1);

  const nextPage = () => setPage((page) => page + 1);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const createRecord = (values) => {
    return sleep(1000).then(() => {
      const arr = [];
      inputs.struct.sections.forEach((section) =>
        section.rows.forEach((row) => row.columns.forEach((props) => arr.push(props)))
      );
      const userField = arr.find((ques) => ques.useAsUsername == true);

      if (!values[userField.label])
        throw new SubmissionError({
          [userField.label]: "This Field cannot be empty",
          _error: "This Field cannot be empty",
        });
      else {
        setStatus("loading");
        const password = "Admin@12345";
        const username = values[userField.label];
        createUserWithEmailAndPassword(auth, username, password)
          .then(async ({ user }) => {
            register(values, user.uid)
              .then(() => setStatus("success"))
              .catch(() => setStatus("failure"));
          })
          .catch(() => setStatus("failure"));
      }
    });
  };
  if (status == "loading")
    return (
      <div className="relative w-full h-screen">
        <div className="absolute top-[50%] left-[50%] flex flex-col items-center transform -translate-x-[50%] -translate-y-[50%]">
          <div className="w-[100px] h-[100px] mx-0 my-[10px] px-[20px] pt-[20px] rounded text-center">
            <div className="load-3">
              <div className="line mx-0.5 inline-block w-[15px] h-[25px] rounded bg-[#4b9cdb]"></div>
              <div className="line mx-0.5 inline-block w-[15px] h-[25px] rounded bg-[#4b9cdb]"></div>
              <div className="line mx-0.5 inline-block w-[15px] h-[25px] rounded bg-[#4b9cdb]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  else if (status == "progress")
    return (
      <>
        {inputs.struct.sections.map((section, i) => {
          if (page == i + 1)
            return (
              <Form
                {...props}
                createRecord={createRecord}
                page={page}
                onSubmit={inputs.struct.sections.length == page ? createRecord : nextPage}
                setPage={setPage}
                section={section}
                inputs={inputs}
              />
            );
        })}
      </>
    );
  else if (status == "success")
    return (
      <div className="relative w-full h-[50vh]">
        <div className="absolute top-[50%] left-[50%] flex flex-col items-center transform -translate-x-[50%] -translate-y-[50%]">
          <CheckCircleIcon className="w-30 md:w-1/3 h-30 md:h-1/3 text-green-700" />
          <p className="text-center w-full md:w-2/3 leading-tighter tracking-tighter font-bold text-xl text-gray-700">
            {inputs.success_message || "We have received your registration, Admin will be in touch with you shortly!"}
          </p>
        </div>
      </div>
    );
  else if (status == "failure")
    return (
      <div className="relative w-full h-[50vh]">
        <div className="absolute top-[50%] left-[50%] flex flex-col items-center transform -translate-x-[50%] -translate-y-[50%]">
          <XCircleIcon className="w-30 md:w-1/3 h-30 md:h-1/3 text-red-700" />
          <p className="text-center w-full md:w-2/3 leading-tighter tracking-tighter font-bold text-xl text-gray-700">
            {inputs.failure_message || "Somthing wrong contact support@melonin.com"}
          </p>
        </div>
      </div>
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

  function _hex_is_light(color) {
    if (!color) return true;
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  }

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
          className={`text-white cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          style={{
            backgroundColor: inputs?.title_color || "#f3f4f6",
            color: _hex_is_light(inputs?.title_color) ? "#374151" : "#ffffff",
          }}
          {...(inputs.struct.sections.length == page && { disabled: pristine || submitting })}
        >
          {inputs.struct.sections.length == page ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
});
