import React from "react";
import { motion } from "framer-motion";
import { DocumentTextIcon, PlusCircleIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import Breadcrumb from "../commons/Breadcrumb";
import FormSection from "./FormSection";
import FormColumn from "./FormColumn";
import FormRow from "./FormRow";

function FormComponent({ formDetails = {} }) {
  const [form, setForm] = React.useState(formDetails);
  // { sections: [{ rows: [{ columns: [{}, {}] }] }] });
  const [toggle, toggleDropdown] = React.useState(false);

  return (
    <motion.div initial={{ x: "300px", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-300px", opacity: 0 }}>
      <Breadcrumb
        crumbs={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/settings", text: "settings" },
        ]}
      />
      <div className="flex justify-between mt-5">
        <h3 className="font-bold text-3xl">Form Builder</h3>
        <div className="flex gap-x-2">
          <button className="h-10 md:h-15 inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
            <PlusCircleIcon className="w-4 h-4" />
            Add Section
          </button>

          <div className="h-10 md:h-15 relative flex h-15">
            <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 pl-5 pr-2 text-sm rounded-l-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
              <DocumentTextIcon className="w-4 h-4" />
              Save
            </button>
            <button
              data-dropdown-toggle="dropdown"
              onClick={(e) => toggleDropdown((val) => !val)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 text-sm rounded-r-lg shadow outline-none focus:outline-none focus:shadow-outline"
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
          <h2 className="text-xl">Registration Form</h2>
          <p className="self-start text-sm">Please fill all the required fields</p>
        </div>

        {form.sections &&
          form.sections.map((section, sid) => (
            <FormSection key={sid} sectionId={sid} addRow={setForm}>
              {form.rows &&
                section.rows.map((row, rid) => (
                  <FormRow key={rid} sectionId={sid} rowId={rid} addColumn={setForm}>
                    {row.columns.map((column, cid) => (
                      <FormColumn
                        item={column}
                        sectionId={sid}
                        rowId={rid}
                        columnId={cid}
                        setData={setForm}
                        key={cid}
                      />
                    ))}
                  </FormRow>
                ))}
            </FormSection>
          ))}
      </div>
    </motion.div>
  );
}

export default FormComponent;
