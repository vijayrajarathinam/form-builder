import React from "react";
import RegisterContainer from "./RegisterContainer2";
import WizardForm from "./wizard/WizardForm";
// import { Values } from "redux-form-website-template";
{
  /* <Values form="wizard" /> */
}
function RegisterWrapper({ data }) {
  const isWizard = data.wizard || false;
  console.log(data.struct);
  return (
    <div className="bg-white h-auto container">
      <div className="my-20 w-full max-w-50 mx-auto border border-gray-300 rounded-lg p-1 h-auto">
        <div className="flex flex-col bg-gray-100 items-center gap-y-5 text-gray-700 border border-gray-100 px-4 pt-4 pb-2">
          <h2 className="text-3xl">Register Page</h2>
          <p className="self-start text-sm">Please fill all the required fields</p>
        </div>

        {isWizard ? <WizardForm inputs={data} /> : <RegisterContainer inputs={data} />}
      </div>
    </div>
  );
}

export default RegisterWrapper;
