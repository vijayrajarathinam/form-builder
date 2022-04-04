import React from "react";
import { PlusIcon, TrashIcon, ArrowsExpandIcon } from "@heroicons/react/outline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";

function FormRow({ children, addColumn, sectionId, rowId, rowProvided }) {
  const [toggle, setToggle] = React.useState(false);

  function onAddClick(e) {
    e.preventDefault();

    addColumn((data) => {
      return {
        ...data,
        struct: {
          sections: data.struct.sections.map((session, sid) => {
            return {
              name: session.name,
              rows: session.rows.map((row, rid) => {
                const columns = sid === sectionId && rowId === rid ? [...row.columns, {}] : row.columns;
                return { columns };
              }),
            };
          }),
        },
      };
    });
  }

  function onDeleteClick(e) {
    e.preventDefault();

    addColumn((data) => {
      return {
        ...data,
        struct: {
          sections: data.struct.sections.map((session, sid) => {
            return {
              name: session.name,
              rows: session.rows.filter((row, rid) => {
                return sid === sectionId && rowId === rid ? false : true;
              }),
            };
          }),
        },
      };
    });
  }

  return (
    <Draggable key={`row-${sectionId}-${rowId}`} draggableId={`draggable-row-${sectionId}-${rowId}`} index={rowId}>
      {(provided, snapshot) => {
        return (
          <div
            className={`flex w-full ${snapshot.isDragging && "shadow-material bg-white"} 
            ${toggle && "border border-gray-400"}
            relative flex-col items-center gap-y-3 text-gray-500  my-1 p-3`}
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className={` ${toggle ? "block" : "hidden"} 
                   flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50`}
              style={{ zIndex: 1 }}
            >
              <div
                onClick={onAddClick}
                className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer"
              >
                <PlusIcon className="h-4 w-4" />
                <p className="text-xs">Add Column</p>
              </div>
              <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
                <TrashIcon onClick={onDeleteClick} className="h-4 w-4 cursor-pointer" />
              </div>
              <button {...provided.dragHandleProps}>
                <ArrowsExpandIcon className="h-4 w-4 " />
              </button>
            </div>
            <div className="flex items-center w-full gap-x-4">{children}</div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default FormRow;
