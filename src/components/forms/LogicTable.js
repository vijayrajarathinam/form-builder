import React from "react";
import { PlusCircleIcon, TrashIcon, MenuIcon } from "@heroicons/react/outline";

export default function ({ title, questions, rows, addRow, ...props }) {
  console.log(questions);

  //   function getOptions({}) {}
  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
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
                      {/* <span className="">Add</span> */}
                      <button
                        onClick={(e) => addRow(e, title)}
                        className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-2 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
                      >
                        <PlusCircleIcon className="w-4 h-4" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {rows.length ? (
                    rows.map((row) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="w-4 py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <MenuIcon className="w-4 h-4 text-center  " />
                        </td>
                        <td className="py-2 px-6">
                          <select className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {questions?.map(({ label, text }) => (
                              <option value={label}>{text}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {/* {questions?.map(({ label, text }) => (
                          <option value={label}>{text}</option>
                    ))} */}
                          <select className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </td>
                        <td className="py-2 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <button className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold p-2 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-2 px-6 text-center">
                        No entries ..
                      </td>
                    </tr>
                  )}
                  {/* <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="w-4 py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <MenuIcon className="w-4 h-4 text-center  " />
                    </td>
                    <td className="py-2 px-6">
                      <select className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {questions?.map(({ label, text }) => (
                          <option value={label}>{text}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {/* {questions?.map(({ label, text }) => (
                          <option value={label}>{text}</option>
                    ))} 
                      <select className="p-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white leading-tight bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="py-2 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <button className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold p-2 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                   */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
