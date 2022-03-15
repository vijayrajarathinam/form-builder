import React from "react";
import RegisterContainer from "./RegisterContainer";
import WizardForm from "./wizard/WizardForm";
// import { Values } from "redux-form-website-template";

function RegisterWrapper({ data }) {
  console.log(data);
  return (
    <div className="bg-white h-auto container">
      {/* <RegisterContainer data={data} /> */}
      <WizardForm inputs={data} />
      {/* <Values form="wizard" /> */}
    </div>
  );
}

export default RegisterWrapper;
