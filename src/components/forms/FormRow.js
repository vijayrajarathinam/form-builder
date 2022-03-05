import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";

function FormRow({ children, addColumn, sectionId, rowId }) {
  const [toggle, setToggle] = React.useState(false);

  function onAddClick(e) {
    e.preventDefault();

    addColumn((data) => {
      return {
        sections: data.sections.map((session, sid) => {
          return {
            rows: session.rows.map((row, rid) => {
              const columns = sid === sectionId && rowId === rid ? [...row.columns, {}] : row.columns;
              return { columns };
            }),
          };
        }),
      };
    });
  }

  function onDeleteClick(e) {
    e.preventDefault();

    addColumn((data) => {
      return {
        sections: data.sections.map((session, sid) => {
          return {
            rows: session.rows.filter((row, rid) => {
              return sid === sectionId && rowId === rid ? false : true;
            }),
          };
        }),
      };
    });
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ y: "-300px", x: 0, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ y: "300px", x: 0, opacity: 0 }}
        className="flex w-full relative flex-col items-center gap-y-3 text-gray-500 border border-gray-300 p-3"
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        <div
          className={` ${
            toggle ? "block" : "hidden"
          } flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-300 bg-gray-50`}
        >
          <div onClick={onAddClick} className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add Column</p>
          </div>
          <TrashIcon onClick={onDeleteClick} className="h-4 w-4 cursor-pointer" />
        </div>
        <div className="flex items-center w-full gap-x-4">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}

export default FormRow;
