import React from "react";
import RegisterContainer from "./RegisterContainer2";
import WizardForm from "./wizard/WizardForm";

function RegisterWrapper({ data }) {
  const isWizard = data.wizard || false;

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
    <div className="h-auto container">
      <div className="my-20 w-full bg-white max-w-50 mx-auto border border-gray-300 rounded-lg p-1 h-auto">
        <div
          className="relative flex flex-col items-center gap-y-5 border border-gray-100 px-4 pt-4 pb-2"
          style={{
            backgroundColor: data?.title_color || "#f3f4f6",
            color: _hex_is_light(data?.title_color) ? "#374151" : "#ffffff",
          }}
        >
          {data.icon && (
            <div
              className="w-20 h-20 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-0.5 rounded-xl shadow-sm bg-white"
              style={{ border: "1px solid #efefef" }}
            >
              <img src={data.icon} />
            </div>
          )}

          <h2 className="text-3xl" style={{ marginTop: data.icon && 30 }}>
            {data?.name}
          </h2>
          <p className="self-start text-sm">Please fill all the required fields</p>
        </div>
        {isWizard ? <WizardForm inputs={data} /> : <RegisterContainer inputs={data} />}
      </div>
    </div>
  );
}

export default RegisterWrapper;
