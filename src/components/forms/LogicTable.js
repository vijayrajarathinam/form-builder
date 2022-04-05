import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleIcon, TrashIcon, MenuIcon } from "@heroicons/react/outline";

export default function ({ title, questions, rows, addRow, deleteRow, onLogicOptionChange, onValueChange, ...props }) {
  const getLogicOptionField = ({ type, ...rest }, title, rowId) => {
    const onChange = (e) => onValueChange(e, title, rowId);
    switch (type) {
      case "dropdown":
        return displayOptions(rest, onChange);
      case "text":
        return displayTextField(rest, onChange);
      case "checkbox":
        return displayCheckbox(rest, onChange);
      case "radio":
        return displayOptions(rest, onChange);
      default:
        return displayTextField(rest, onChange);
    }
  };

  const displayTextField = (props, onChange) => (
    <input
      {...props}
      onChange={onChange}
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    />
  );

  const displayOptions = (props, onChange) => (
    <select
      onChange={onChange}
      className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {props.options && props.options.map((option, i) => <option value={option.value}>{option.name}</option>)}
    </select>
  );

  const displayCheckbox = (props, onChange) => (
    <select
      {...props}
      onChange={onChange}
      className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="true">checked</option>
      <option value="false">unchecked</option>
    </select>
  );

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div className="flex flex-col">
        <div className="shadow-md sm:rounded">
          <div className="inline-block min-w-full align-middle">
            {/* <div className="overflow-hidden "> */}
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    <div class="flex items-center">{title}</div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    {title} Question's
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Value
                  </th>
                  <th scope="col" className="py-2 px-6 text-right">
                    <button
                      onClick={(e) => addRow(e, title)}
                      className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-2 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
                    >
                      <PlusCircleIcon className="w-4 h-4" />
                    </button>
                  </th>
                </tr>
              </thead>
              <Droppable droppableId={title} key={title}>
                {(provided, snapshot) => {
                  return (
                    <tbody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                    >
                      {rows.length ? (
                        rows.map((row, rowId) => (
                          <Draggable key={rowId} index={rowId} draggableId={`draggable-tr-${title}-${rowId}`}>
                            {(provided, snapshot) => {
                              return (
                                <tr
                                  ref={provided.innerRef}
                                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                  {...provided.draggableProps}
                                  style={{
                                    backgroundColor: snapshot.isDragging ? "#f8f8f8" : "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <td className="w-4 py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <button {...provided.dragHandleProps}>
                                      <MenuIcon className="h-4 w-4 " />
                                    </button>

                                    {/* <MenuIcon {...provided.dragHandleProps} className="w-4 h-4 text-center" /> */}
                                  </td>
                                  <td className="py-2 px-6">
                                    <select
                                      value={row.field.label}
                                      onChange={(e) => onLogicOptionChange(e, title, rowId)}
                                      className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                      {questions?.map(({ label, text }) => (
                                        <option value={label}>{text}</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {getLogicOptionField(row.field, title, rowId)}
                                  </td>
                                  <td className="py-2 px-6 text-sm font-medium text-right whitespace-nowrap">
                                    <button
                                      onClick={(e) => {
                                        console.log(rowId);
                                        deleteRow(title, rowId);
                                      }}
                                      className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold p-2 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
                                    >
                                      <TrashIcon className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            }}
                          </Draggable>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-2 px-6 text-center">
                            No entries ..
                          </td>
                        </tr>
                      )}
                      {provided.placeholder}
                    </tbody>
                  );
                }}
              </Droppable>
            </table>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
