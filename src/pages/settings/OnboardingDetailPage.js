import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { XIcon, DocumentTextIcon, PlusCircleIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import Breadcrumb from "../../components/commons/Breadcrumb";
import FormComponent from "../../components/forms/FormComponent";
import { getAllForms, modifyForm } from "../../redux/actions/formActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function OnboardingDetailPage() {
  const [toggle, toggleDropdown] = React.useState(false);
  const [form, setForm] = React.useState({ name: "Form Heading", struct: {} });
  const { error, data, loading } = useSelector((state) => state.forms);
  const [modal, showModal] = React.useState(false);
  const handleClose = () => showModal(false);
  const { formId } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllForms());
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
  }, []);

  React.useEffect(() => {
    if (data && loading === false) setForm(data.find((d) => d.id === formId));
  }, [data, loading]);

  const isEmpty = function (arr) {
    return Object.keys(arr || {}).length === 0;
  };

  function addSection(name) {
    setForm((fom) => {
      if (isEmpty(fom.struct)) return { ...fom, struct: { sections: [{ name, rows: [{ columns: [{}] }] }] } };
      const form = fom;
      form.struct.sections.push({ name, rows: [{ columns: [{}] }] });
      return form;
    });
  }

  function save(e) {
    e.preventDefault();

    dispatch(modifyForm(form, formId));
    toast.success("submitted successfully.....");
  }

  return (
    <motion.div initial={{ x: "300px", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-300px", opacity: 0 }}>
      <Breadcrumb
        crumbs={[
          { link: "/", text: "dashboard" },
          { link: "/settings", text: "settings" },
          { link: "/settings/formbuilder", text: "form builder" },
          { link: `/settings/formbuilder/${formId}`, text: `${formId}` },
        ]}
      />
      <div className="flex justify-between mt-5">
        <h3 className="font-bold text-3xl">Form Builder</h3>
        <div className="flex gap-x-2">
          <button
            onClick={(e) => showModal(true)}
            className="h-10 md:h-15 inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
          >
            <PlusCircleIcon className="w-4 h-4" />
            Add Section
          </button>

          <div className="h-10 md:h-15 relative flex h-15">
            <button
              onClick={save}
              className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 pl-5 pr-2 text-sm rounded-l-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <DocumentTextIcon className="w-4 h-4" />
              Save
            </button>
            <button
              data-dropdown-toggle="dropdown"
              onClick={(e) => toggleDropdown((val) => !val)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-2 text-sm rounded-r-lg shadow outline-none focus:outline-none focus:shadow-outline"
            >
              <DotsVerticalIcon className="w-4 h-4" />
            </button>
            <div
              id="dropdown"
              className={`${
                toggle ? "block" : "hidden"
              } absolute right-0 top-full mt-1 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
              style={{ border: "1px solid #ccc" }}
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Save As Draft
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Preview This Page
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Theme Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5 relative p-4 mt-10 h-auto min-h-10 border-2 border-dashed border-gray-400 ">
        <p className="text-gray-500 absolute -top-4 bg-white left-1/2 transform -translate-x-1/2 px-2">SECTIONS</p>
        <div className="flex flex-col bg-gray-100 items-center gap-y-5 text-gray-700 border border-gray-100 px-4 pt-4 pb-2">
          <h2 className="text-xl">{form.name}</h2>
          <p className="self-start text-sm">Please fill all the required fields</p>
        </div>

        <FormComponent form={form.struct} setForm={setForm} />
        <CreateSectionModal show={modal} handleClose={handleClose} addSection={addSection} />
      </div>
    </motion.div>
  );
}

export default OnboardingDetailPage;

const variants = {
  start: { y: 100, x: "-50%", transition: { duration: 0.5 } },
  stop: { y: -100, x: "-50%", transition: { repeatDelay: 3 } },
};

const CreateSectionModal = ({ handleClose, show, addSection }) => {
  const [name, setName] = useState("");
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";
  // const dispatch = useDispatch();

  function onModalSubmit(e) {
    e.preventDefault();
    // dispatch(addNewForm({ name, status: "active", struct: {} }));
    addSection(name);
    toast.success("Section Created");
    handleClose();
  }

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }}>
        <motion.section variants={variants} animate={show ? "start" : "stop"} className="profile-modal w-full">
          <div className="flex items-center justify-between ">
            <p className="text-xl">Create New form</p>
            <button onClick={handleClose}>
              <XIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-5 my-5 ">
            <div className="flex w-full flex-col mb-2">
              <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
                Section Name <span className="text-red-500 pl-1">*</span>
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
            <button
              onClick={onModalSubmit}
              className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Create
            </button>

            <button
              onClick={handleClose}
              className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <XIcon className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
};
