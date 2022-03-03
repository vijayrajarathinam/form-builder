import React from "react";

//not in use
function index() {
  return (
    <div className="flex relative flex-col items-center gap-y-3 text-gray-500 border border-gray-400 p-3">
      <div className="flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50">
        <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
          <PlusIcon className="h-4 w-4" />
          <p className="text-xs">Add Column</p>
        </div>
        <TrashIcon className="h-4 w-4 cursor-pointer" />
      </div>
      <h2 className="text-xl self-start">Section 1</h2>
      <div className="flex w-full relative flex-col items-center gap-y-3 text-gray-500 border border-gray-400 p-3">
        <div className="flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50">
          <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add Rows</p>
          </div>
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </div>
        <h2 className="text-xl self-start">Column 1</h2>
      </div>
      <div className="flex w-full relative flex-col items-center gap-y-3 text-gray-500 border border-gray-400 p-3">
        <div className="flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50">
          <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add Rows</p>
          </div>
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </div>

        <div className="flex w-full flex-col gap-x-4">
          <button className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300">
            <div className="flex gap-1 items-center pr-2 cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              <p className="text-xs">Add an Item</p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex w-full relative flex-col items-center gap-y-3 text-gray-500 border border-gray-400 p-3">
        <div className="flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50">
          <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add Rows</p>
          </div>
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </div>

        <div className="flex w-full gap-x-4">
          <button className="w-1/2 px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300">
            <div className="flex gap-1 items-center pr-2 cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              <p className="text-xs">Add an Item</p>
            </div>
          </button>
          <button className="w-1/2 px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300">
            <div className="flex gap-1 items-center pr-2 cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              <p className="text-xs">Add an Item</p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex w-full relative flex-col items-center gap-y-3 text-gray-500 border border-gray-400 p-3">
        <div className="flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50">
          <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add Rows</p>
          </div>
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </div>

        <div className="flex w-full flex-col mb-2">
          <label for="phone" className="inline-flex mb-2 text-sm text-gray-800">
            Please enter a phone number (optional)
          </label>
          <input
            name="phone"
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300"
          />
        </div>
      </div>

      <div className="flex w-full relative flex-col items-center gap-y-3 text-gray-500 border border-gray-400 p-3">
        <div className="flex gap-x-2 absolute right-0 top-0 px-3 py-2 border-l border-b border-gray-400 bg-gray-50">
          <div className="flex gap-1 items-center border-r border-gray-400 pr-2 cursor-pointer">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Add Rows</p>
          </div>
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </div>
        <div className="flex w-full gap-x-4">
          <div className="flex w-1/2 flex-col mb-2">
            <label for="phone" className="inline-flex mb-2 text-sm text-gray-800">
              Please enter a phone number (optional)
            </label>
            <input
              name="phone"
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300"
            />
          </div>
          <div className="flex w-1/2  flex-col mb-2">
            <label for="phone" className="inline-flex mb-2 text-sm text-gray-800">
              Please enter a phone number (optional)
            </label>
            <input
              name="phone"
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
