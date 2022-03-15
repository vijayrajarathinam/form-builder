import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import middleware from "./components";
import { auth } from "../../firebase";
import { register } from "../../api/userApi";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

function RegisterContainer({ data: { struct } }) {
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState({});
  const [status, setStatus] = React.useState("progress"); //failure
  const [username, setUsername] = React.useState("");

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

      if (input.type == "email")
        if (!value.toLowerCase().match(re)) err[input.label] = "Not a valid email";
        else if (input.useAsUsername) setUsername(value);

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
    // console.log(data);
    if (username == "") return;
    const password = "Admin@12345";
    setStatus("loading");
    createUserWithEmailAndPassword(auth, username, password)
      .then(async ({ user }) => {
        register(data, user.uid)
          .then(() => setStatus("success"))
          .catch(() => setStatus("failure"));

        // return navigate("/login");
      })
      .catch(console.log);
  }

  if (status == "progress") {
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
      </div>
    );
  } else if (status == "success") {
    return (
      <div className="relative w-full h-screen">
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
      <div className="relative w-full h-screen">
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
  }
}

export default RegisterContainer;
