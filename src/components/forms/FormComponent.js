import React from "react";
import { DocumentTextIcon, PlusCircleIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import FormSection from "./FormSection";
import FormRow from "./FormRow";
import FormColumn from "./FormColumn";

function FormComponent() {
  const [form, setForm] = React.useState({ sections: [{ rows: [{ columns: [{}, {}] }] }] });

  React.useEffect(() => {}, [form, setForm]);
  return (
    <div>
      <div className="flex justify-between mt-5">
        <h3 className="font-bold text-3xl">Onboarding Form Builder</h3>
        <div className="flex gap-x-2">
          <button className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
            <PlusCircleIcon className="w-4 h-4" />
            Add Section
          </button>

          <div>
            <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 pl-5 pr-2 text-sm rounded-l-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
              <DocumentTextIcon className="w-4 h-4" />
              Save
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 text-sm rounded-r-lg shadow outline-none focus:outline-none focus:shadow-outline">
              <DotsVerticalIcon className="w-4 h-4" />
            </button>
          </div>

          {/* <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
            <PresentationChartLineIcon className="w-4 h-4" />
            Preview
          </button> */}
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5 relative p-4 mt-10 h-auto min-h-10 border-2 border-dashed border-gray-400 ">
        <p className="text-gray-400 absolute -top-4 bg-white left-1/2 transform -translate-x-1/2 px-2">SECTIONS</p>
        <div className="flex flex-col bg-gray-50 items-center gap-y-5 text-gray-500 border border-gray-100 px-4 pt-4 pb-2">
          <h2 className="text-xl">Registration Form</h2>
          <p className="self-start text-sm">Please fill all the required fields</p>
        </div>

        {form.sections.map((section, sid) => (
          <FormSection key={sid} sectionId={sid} addRow={setForm}>
            {section.rows.map((row, rid) => (
              <FormRow key={rid} sectionId={sid} rowId={rid} addColumn={setForm}>
                {row.columns.map((column, cid) => (
                  <FormColumn item={column} sectionId={sid} rowId={rid} columnId={cid} setData={setForm} key={cid} />
                ))}
              </FormRow>
            ))}
          </FormSection>
        ))}
      </div>
    </div>
  );
}

export default FormComponent;
