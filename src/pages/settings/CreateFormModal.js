import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircleIcon, XIcon } from "@heroicons/react/outline";
import { addNewForm } from "../../redux/actions/formActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../components/commons/Button";

const variants = {
  start: { y: 100, x: "-50%", transition: { duration: 0.5 } },
  stop: { y: -100, x: "-50%", transition: { repeatDelay: 3 } },
};

const CreateFormModal = ({ handleClose, show }) => {
  const [name, setName] = useState("");
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";
  const dispatch = useDispatch();

  function onModalSubmit() {
    // e.preventDefault();
    dispatch(addNewForm({ name, subText: "Please fill all the required fields", status: "active", struct: {} }));
    toast.success("Form Created Successfully");
    handleClose();
  }

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }}>
        <motion.section variants={variants} animate={show ? "start" : "stop"} className="profile-modal">
          <div className="flex items-center justify-between ">
            <p className="text-xl">Create New form</p>
            <button onClick={handleClose}>
              <XIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-5 my-5 ">
            <div className="flex w-full flex-col mb-2">
              <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
                Form Name <span className="text-red-500 pl-1">*</span>
              </label>
              <input
                id="name"
                tabIndex={0}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 text-gray-800 border rounded outline-none bg-gray-50"
              />
            </div>
          </div>
          <div className="flex mt-5 gap-x-2 justify-end">
            <Button.Primary Icon={PlusCircleIcon} text="Create" onClick={() => onModalSubmit()} />
            <Button.Danger Icon={XIcon} text="Cancel" onClick={() => handleClose()} />
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
};

export default CreateFormModal;
