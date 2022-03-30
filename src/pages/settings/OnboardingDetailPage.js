import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import * as outlineIcons from "@heroicons/react/outline";
import { getAllForms, modifyForm } from "../../redux/actions/formActions";
import ThemeBuilder from "../../components/forms/theme/ThemeBuilder";
import FormComponent from "../../components/forms/FormComponent";
import Breadcrumb from "../../components/commons/Breadcrumb";
import Button from "../../components/commons/Button";

const { XIcon, DocumentTextIcon, PlusCircleIcon, DotsVerticalIcon } = outlineIcons;
const ctx = new AudioContext();

function OnboardingDetailPage() {
  const [toggle, toggleDropdown] = useState(false);
  const [theme, setTheme] = useState(false);
  const [form, setForm] = useState({ name: "Form Heading", struct: {} });
  const { error, data, loading } = useSelector((state) => state.forms);
  const [modal, showModal] = useState(false);
  const handleClose = () => showModal(false);
  const { formId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllForms());
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
  }, []);

  const questions = useMemo(() => {
    const arr = [];
    if (!form.struct.sections) return arr;
    if (form.status == "draft") {
      form.draftStruct.sections.forEach((section) =>
        section.rows.forEach((row) => row.columns.forEach((props) => arr.push(props)))
      );
    } else {
      form.struct.sections.forEach((section) =>
        section.rows.forEach((row) => row.columns.forEach((props) => arr.push(props)))
      );
    }
    return arr;
  }, [form?.struct]);

  useEffect(() => {
    if (data && loading === false) setForm(data.find((d) => d.id === formId));
  }, [data, loading]);

  const isEmpty = function (arr) {
    return Object.keys(arr || {}).length === 0;
  };

  function createSound(fr, time, _type, vol) {
    const osc = ctx.createOscillator(),
      gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = _type;
    osc.start();
    osc.frequency.value = fr;
    gain.gain.value = vol;
    setTimeout(() => {
      osc.frequency.value = 0;
      osc.stop();
    }, time);
  }

  function addSection(name) {
    setForm((fom) => {
      if (isEmpty(fom.struct)) return { ...fom, struct: { sections: [{ name, rows: [{ columns: [{}] }] }] } };
      const form = fom;
      form.struct.sections.push({ name, rows: [{ columns: [{}] }] });
      return form;
    });
  }

  function save() {
    const activeForm = { ...form, ["status"]: "active" };
    dispatch(modifyForm(activeForm, formId));
    toast.success("submitted successfully.....");
  }

  function saveAsDraft() {
    const draftForm = {
      ...form,
      struct: data.find((d) => d.id === formId).struct,
      draftStruct: form.struct,
      ["status"]: "draft",
    };
    dispatch(modifyForm(draftForm, formId));
    toast.success("Drafted");
  }

  function removeDraft() {
    const draftForm = {
      ...form,
      draftStruct: {},
      ["status"]: "active",
    };
    dispatch(modifyForm(draftForm, formId));
    toast.success("Drafted removed");
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

      <div className="flex flex-col h-20 md:h-10 md:flex-row justify-between mt-5">
        <h3 className="font-bold text-3xl">Form Builder</h3>
        <div className="flex gap-x-2">
          <Button.Default Icon={PlusCircleIcon} text="Add Section" onClick={() => showModal(true)} />
          <div className="h-10 md:h-15 relative flex h-15">
            <button
              onClick={save}
              onMouseUp={(e) => createSound(350, 50, "triangle", 0.07)}
              onMouseDown={(e) => createSound(350, 50, "triangle", 0.05)}
              className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 pl-5 pr-2 text-sm rounded-l-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
            >
              <DocumentTextIcon className="w-4 h-4" />
              Save
            </button>
            <button
              data-dropdown-toggle="dropdown"
              onClick={(e) => toggleDropdown((val) => !val)}
              onMouseUp={(e) => createSound(350, 50, "triangle", 0.07)}
              onMouseDown={(e) => createSound(350, 50, "triangle", 0.05)}
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2.5 px-2 text-sm rounded-r-lg shadow outline-none focus:outline-none focus:shadow-outline"
            >
              <DotsVerticalIcon className="w-4 h-4" />
            </button>
            <div
              id="dropdown"
              className={`${
                toggle ? "block" : "hidden"
              } absolute right-0 top-full mt-1 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
              style={{ border: "1px solid #ccc", zIndex: 1 }}
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    onClick={saveAsDraft}
                    className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Save As Draft
                  </a>
                </li>
                {form.status == "draft" && (
                  <li>
                    <a
                      onClick={removeDraft}
                      className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Remove the Draft
                    </a>
                  </li>
                )}
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(false);
                      setTheme(true);
                    }}
                    className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Theme Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-0.5  relative p-4 mt-10 h-auto min-h-10 border-2 border-dashed border-gray-400 ">
        <p className="text-gray-500 absolute -top-4 bg-white dark:bg-[#1e1e1e] left-1/2 transform -translate-x-1/2 px-2">
          SECTIONS
        </p>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 dark:text-white/[0.5] items-center gap-y-5 text-gray-700 border border-gray-100 dark:border-gray-700 px-4 pt-4 pb-2">
          <h2 className="text-xl">{form.name}</h2>
          <p className="self-start text-sm">Please fill all the required fields</p>
        </div>

        <FormComponent
          questions={questions}
          form={form.status == "draft" ? form.draftStruct : form.struct}
          setForm={setForm}
        />
        <CreateSectionModal show={modal} handleClose={handleClose} addSection={addSection} />
        <ThemeBuilder form={form} setForm={setForm} save={save} handleClose={(e) => setTheme(false)} show={theme} />
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

  function onModalSubmit() {
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
            <Button.Primary Icon={PlusCircleIcon} text="Create" onClick={() => onModalSubmit()} />
            <Button.Danger Icon={XIcon} text="Cancel" onClick={() => handleClose()} />
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
};
