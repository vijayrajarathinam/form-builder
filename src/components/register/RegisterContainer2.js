import React, { useState, useEffect, useMemo } from "react";
import { Field, reduxForm } from "redux-form";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import middleware from "./components2";
import validate from "./wizard/validate";
import { SubmissionError } from "redux-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { register } from "../../api/userApi";
import { auth } from "../../firebase";

export default function ({ ...props }) {
  const {
    inputs: { struct, formStatus },
  } = props;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    status != formStatus && setStatus(formStatus);
  }, [formStatus]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const createRecord = (values) => {
    return sleep(1000).then(() => {
      if (!values.email)
        throw new SubmissionError({ email: "This Field cannot be empty", _error: "This Field cannot be empty" });
      else {
        setStatus("loading");
        const password = "Admin@12345";
        const username = values.email;
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

  if (status == "progress") return <Form {...props} createRecord={createRecord} struct={struct} />;
  else if (status == "success") {
    return (
      <div className="relative w-full h-[50vh]">
        <div className="absolute top-[50%] left-[50%] flex flex-col items-center transform -translate-x-[50%] -translate-y-[50%]">
          <CheckCircleIcon className="w-30 md:w-1/3 h-30 md:h-1/3 text-green-700" />
          <p className="text-center w-full md:w-2/3 leading-tighter tracking-tighter font-bold text-xl text-gray-700">
            We have received your registration, Admin will be in touch with you shortly!
          </p>
        </div>
      </div>
    );
  } else if (status == "failure") {
    return (
      <div className="relative w-full h-[50vh]">
        <div className="absolute top-[50%] left-[50%] flex flex-col items-center transform -translate-x-[50%] -translate-y-[50%]">
          <XCircleIcon className="w-30 md:w-1/3 h-30 md:h-1/3 text-red-700" />
          <p className="text-center w-full md:w-2/3 leading-tighter tracking-tighter font-bold text-xl text-gray-700">
            Somthing wrong contact support@melonin.com
          </p>
        </div>
      </div>
    );
  } else if (status == "loading") {
    return (
      <div className="relative w-full h-[27rem]">
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
  }
}

const Form = reduxForm({
  form: "form",
  validate,
})(function ({ ...props }) {
  const { struct, handleSubmit, createRecord, submitting } = props;
  // console.log(props);
  return (
    <form onSubmit={handleSubmit(createRecord)} className="flex relative flex-col mx-3 gap-y-1 text-gray-500 py-3">
      {struct?.sections?.map((section) => (
        <div className="">
          <h2 className="text-xl self-start capitalize">{section.name}</h2>
          {section.rows.map((row) => (
            <div className="flex flex-col md:flex-row items-center w-full text-gray-500">
              {row.columns.map((props) => (
                <Field
                  name={props.label}
                  type={props.type}
                  text={props.text}
                  label={props.text}
                  logic={props.logic}
                  {...props}
                  component={({ ...props }) => middleware(props)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-10 p-3">
        <button
          type="submit"
          disabled={submitting}
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
});
