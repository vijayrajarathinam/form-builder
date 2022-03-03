import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";

function FormSection({ children, sectionId, addRow }) {
  const [toggle, setToggle] = React.useState(false);

  function onAddClick(e) {
    e.preventDefault();
    addRow((data) => ({
      sections: data.sections.map((session) => {
        return {
          rows: [...session.rows.map((row) => row), { columns: [{}] }],
        };
      }),
    }));
  }

  function onDeleteClick(e) {
    e.preventDefault();
    addRow((data) => ({
      sections: data.sections.filter((session, id) => {
        return session.id == id ? true : false;
      }),
    }));
  }

  return (
    <div
      className="flex relative flex-col items-center gap-y-3 text-gray-500 border border-gray-300 p-3"
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <div
        className={`${
          toggle ? "block" : "hidden"
        } flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-300 bg-gray-50`}
      >
        <div onClick={onAddClick} className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
          <PlusIcon className="h-4 w-4" />
          <p className="text-xs">Add Row</p>
        </div>
        <TrashIcon onClick={onDeleteClick} className="h-4 w-4 cursor-pointer" />
      </div>
      <h2 className="text-xl self-start">Section {sectionId + 1}</h2>
      {children}
    </div>
  );
}

export default FormSection;
