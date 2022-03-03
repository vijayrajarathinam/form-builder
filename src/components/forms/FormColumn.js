import React from "react";
import Modal from "./FormItemCreate";
import { PlusIcon } from "@heroicons/react/outline";
import CustomeInputField from "./CustomeInputField";

function FormColumn({ item = {}, setData, sectionId, rowId, columnId }) {
  const isEmpty = Object.keys(item).length === 0;
  const [show, onModal] = React.useState(false);

  function onButtonClick() {
    onModal(true);
  }

  function onModalSubmit(item) {
    setData((data) => ({
      sections: data.sections.map((session, sid) => {
        return {
          rows: session.rows.map((row, rid) => {
            return {
              columns: row.columns.map((column, cid) => {
                return sid === sectionId && rowId === rid && columnId === cid ? item : column;
              }),
            };
          }),
        };
      }),
    }));
    onModal(false);
  }

  return (
    <>
      {isEmpty == true ? (
        <button
          onClick={onButtonClick}
          className="w-full h-10 shadow px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 hover:bg-gray-100 focus:ring ring-indigo-300"
        >
          <div className="flex gap-1 items-center pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add an Item</p>
          </div>
        </button>
      ) : (
        <CustomeInputField {...item} onClick={onButtonClick} />
      )}
      <Modal show={show} item={item} handleClose={() => onModal(false)} onModalSubmit={onModalSubmit} />
    </>
  );
}

export default FormColumn;
