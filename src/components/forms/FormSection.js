import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { PlusIcon, TrashIcon, ArrowsExpandIcon } from "@heroicons/react/outline";

function FormSection({ children, name = "Sections", section, questions, sectionId, addRow }) {
  const [toggle, setToggle] = React.useState(false);

  function onAddClick(e) {
    e.preventDefault();

    addRow((data) => ({
      ...data,
      struct: {
        sections: data.struct.sections.map((section, id) => {
          if (id === sectionId)
            return {
              name: section.name,
              rows: [...section.rows.map((row) => row), { columns: [{}] }],
            };
          else return section;
        }),
      },
    }));
  }

  function onDeleteClick(e) {
    e.preventDefault();

    addRow((data) => ({
      ...data,
      struct: {
        sections: data.struct.sections.filter((session, id) => {
          return sectionId == id ? false : true;
        }),
      },
    }));
  }

  return (
    <Draggable key={sectionId} draggableId={`draggable-section-${sectionId}`} index={sectionId}>
      {(provided, snapshot) => {
        return (
          <div
            className={`flex relative ${snapshot.isDragging && "shadow-material bg-white"} border border-gray-400
            flex-col items-center gap-y-3 text-gray-500 my-4 p-3`}
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className={`${
                toggle ? "block" : "hidden"
              } flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50`}
            >
              <div
                onClick={onAddClick}
                className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer"
              >
                <PlusIcon className="h-4 w-4" />
                <p className="text-xs">Add Row</p>
              </div>
              <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
                <TrashIcon onClick={onDeleteClick} className="h-4 w-4 cursor-pointer" />
              </div>
              <button {...provided.dragHandleProps}>
                <ArrowsExpandIcon className="h-4 w-4 " />
              </button>
            </div>

            <h2 className="text-xl self-start capitalize">{name}</h2>
            <Droppable droppableId={`droppable-rows-${sectionId}`} type={sectionId}>
              {(provided, snapshot) => (
                <div className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
                  {children}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
}

export default FormSection;
