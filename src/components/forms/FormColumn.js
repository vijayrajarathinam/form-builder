import React from "react";
import Modal from "./FormItemCreate";
import { PlusIcon } from "@heroicons/react/outline";
import CustomeInputField from "./CustomeInputField";
import { motion } from "framer-motion";

function FormColumn({ item = {}, questions, setData, sectionId, rowId, columnId }) {
  const isEmpty = Object.keys(item).length === 0;
  const [show, onModal] = React.useState(false);

  function onButtonClick() {
    onModal(true);
  }

  function onModalSubmit(item) {
    setData((data) => {
      return {
        ...data,
        struct: {
          sections: data.struct.sections.map((session, sid) => {
            return {
              name: session.name,
              rows: session.rows.map((row, rid) => {
                return {
                  columns: row.columns.map((column, cid) => {
                    return sid === sectionId && rowId === rid && columnId === cid ? item : column;
                  }),
                };
              }),
            };
          }),
        },
      };
    });
    onModal(false);
  }

  return (
    <motion.div initial={{ x: "300px", opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full">
      {isEmpty == true ? (
        <button
          onClick={onButtonClick}
          className="w-full h-20 shadow px-3 py-2 text-gray-800 border rounded outline-none bg-gray-200 hover:bg-gray-300 focus:ring ring-indigo-300"
        >
          <div className="flex gap-1 justify-center items-center pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add an Item</p>
          </div>
        </button>
      ) : (
        <CustomeInputField {...item} onClick={onButtonClick} />
      )}
      <Modal
        show={show}
        questions={questions}
        item={item}
        handleClose={() => onModal(false)}
        onModalSubmit={onModalSubmit}
      />
    </motion.div>
  );
}

export default FormColumn;
