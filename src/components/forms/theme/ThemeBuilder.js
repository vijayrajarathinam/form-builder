import React, { useEffect, useMemo, useState } from "react";
import { SaveIcon } from "@heroicons/react/outline";
import { FileUploader } from "react-drag-drop-files";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../../commons/Button";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
const spring = { type: "spring", stiffness: 700, damping: 30 };
const fileTypes = ["JPG", "PNG", "GIF"];

export default function ({ handleClose, show, form, setForm, ...props }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [wizard, setWizard] = useState(false);
  const [loading, setLoading] = useState(false);
  const useIsSmall = () => useMediaQuery("(min-width: 480px)");
  const isSmall = useIsSmall();
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) handleClose(e);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const variants = useMemo(() => {
    return {
      start: { y: isSmall ? 30 : -10, x: "-50%", transition: { duration: 0.5 } },
      stop: { y: isSmall ? -30 : 0, x: "-50%", transition: { repeatDelay: 3 } },
    };
  }, [isSmall]);

  const handleChange = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFile(file.name);
          toast.success("File uploaded successfully");
          setForm((form) => ({ ...form, icon: url }));
        });
      }
    );
  };

  const submitForm = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    props.save();
  };

  const setFormWizard = (e) => {
    setForm((form) => ({ ...form, ["wizard"]: !form?.wizard }));
    setWizard((w) => !w);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const loadingView = () => (
    <div className="absolute bg-black/[0.3] h-[100%] w-full top-0 left-0 flex flex-col items-center justify-center">
      <div className="w-[100px] h-[100px] mx-0 my-[10px] px-[20px] pt-[20px] rounded text-center">
        <div className="load-3">
          <div className="line mx-0.5 inline-block w-[15px] h-[25px] rounded bg-[#4b9cdb]"></div>
          <div className="line mx-0.5 inline-block w-[15px] h-[25px] rounded bg-[#4b9cdb]"></div>
          <div className="line mx-0.5 inline-block w-[15px] h-[25px] rounded bg-[#4b9cdb]"></div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }} onClick={handleClose}>
        <motion.section
          variants={variants}
          animate={show ? "start" : "stop"}
          className=" fixed rounded-sm bg-[#e7e6eb] w-full sm:w-3/4 md:w-1/3 h-auto left-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center p-4">
            <p className="text-xl font-semibold text-[#533868]">Theme Settings</p>
          </div>
          <div className="overflow-y-scroll scrollbar-hide px-4 pb-4 h-screen sm:h-[40rem]">
            <div className="rounded-xl divide-y-2 bg-white flex flex-col">
              <div className="flex w-full flex-col p-4 hover:bg-black/[0.02]">
                <label
                  for="name"
                  className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                >
                  Title
                  {/* <span className="text-red-500 pl-1">*</span> */}
                </label>
                <div>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded outline-none bg-gray-50 placeholder-grey-50`}
                  />
                  {/* {touched && error && <p className="text-red-500 text-xs italic mt-1 ml-1">{error}</p>} */}
                </div>
              </div>
              <div className="flex w-full flex-col p-4 hover:bg-black/[0.02]">
                <label
                  for="sub_text"
                  className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                >
                  Sub Text
                </label>
                <div>
                  <input
                    type="text"
                    name="sub_text"
                    value={form?.subText}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded outline-none bg-gray-50 placeholder-grey-50`}
                  />
                </div>
              </div>
              <div className="flex items-center p-4 hover:bg-black/[0.02]">
                <div className="grow">
                  <label for="bg_color" className="inline-flex capitalize text-[#7c7a8a] font-bold md:text-right pr-4">
                    Page Background
                  </label>
                </div>
                <div className="">
                  <input
                    type="color"
                    name="bg_color"
                    value={form?.bg_color}
                    onChange={onInputChange}
                    className="w-[25px] h-[25px] p-0.5 outline-none focus:outline-none focus:bg-white "
                    tabIndex="0"
                  />
                </div>
              </div>
              <div className="flex items-center p-4 hover:bg-black/[0.02]">
                <div className="grow">
                  <label
                    for="title_color"
                    className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                  >
                    Title Color
                  </label>
                </div>
                <div className="">
                  <input
                    name="title_color"
                    value={form?.title_color}
                    onChange={onInputChange}
                    type="color"
                    className="w-[25px] h-[25px] p-0.5  outline-none focus:outline-none focus:bg-white"
                    tabIndex="0"
                  />
                </div>
              </div>
              <div className="flex items-center p-4 hover:bg-black/[0.02]">
                <div className="grow">
                  <label
                    for="text"
                    className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                  >
                    Wizard
                  </label>
                </div>
                <div
                  className={`bg-[#e4e3e8] flex items-center px-0.5 rounded-full h-6 w-10 cursor-pointer flex-shrink-0 relative ${
                    form?.wizard ? "justify-end bg-blue-500" : "justify-start bg-white"
                  }`}
                  onClick={setFormWizard}
                >
                  <span className="absolute left-0" />
                  <motion.div
                    className="w-5 h-5 shadow-material bg-white rounded-full z-40"
                    layout
                    transition={spring}
                  />
                  <span className="absolute right-0.5" />
                </div>
              </div>
              <div className="flex w-full flex-col p-4 hover:bg-black/[0.02]">
                <label
                  for="success_message"
                  className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                >
                  Success Message
                  {/* <span className="text-red-500 pl-1">*</span> */}
                </label>
                <div>
                  <input
                    type="text"
                    name="success_message"
                    value={form?.success_message}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded outline-none bg-gray-50 placeholder-grey-50`}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col p-4 hover:bg-black/[0.02]">
                <label
                  for="failure_message"
                  className="inline-flex mb-2 capitalize text-[#7c7a8a] font-bold md:text-right md:mb-1 pr-4"
                >
                  Failure Message
                </label>
                <div>
                  <input
                    type="text"
                    name="failure_message"
                    value={form?.failure_message}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded outline-none bg-gray-50 placeholder-grey-50`}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col p-4 hover:bg-black/[0.02]">
                <FileUploader
                  handleChange={handleChange}
                  label="Upload or Drop your LOGO here"
                  name="file"
                  types={fileTypes}
                >
                  <div className="max-w-xl">
                    <label className="flex justify-center w-full h-24 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        {form.icon ? (
                          <span className="font-medium text-gray-600">
                            <a href={form.icon} target="_blank" className="text-blue-600 underline pr-1">
                              {file || form.icon}
                            </a>
                            Change the logo?
                          </span>
                        ) : (
                          <span className="font-medium text-gray-600">
                            <span className="text-blue-600 underline pr-1">Upload</span>
                            or Drop your LOGO here
                          </span>
                        )}
                      </span>

                      {/* <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="font-medium text-gray-600">
                          <span className="text-blue-600 underline pr-1">Upload</span>
                          or Drop your LOGO here
                        </span>
                      </span>
                    */}
                    </label>
                  </div>
                </FileUploader>
              </div>
            </div>
            <div className="flex mt-5 gap-x-2 ">
              {/* <button
                onClick={submitForm}
                className="inline-flex w-full items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg py-1.5 rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
              >
                <SaveIcon className="w-4 h-4" />
                Save
              </button> */}
              <Button.Primary
                Icon={SaveIcon}
                text="Save"
                className="w-full text-lg py-1.5 items-center justify-center"
                onClick={() => submitForm()}
              />
            </div>
          </div>
          {/* full screen */}

          {loading && loadingView()}
        </motion.section>
      </div>
    </AnimatePresence>
  );
}
