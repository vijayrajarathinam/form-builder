import React from "react";
import RegisterContainer from "./RegisterContainer";

function RegisterWrapper({ data }) {
  return (
    <div className="bg-white h-auto container">
      <RegisterContainer data={data} />
    </div>
  );
}

export default RegisterWrapper;
