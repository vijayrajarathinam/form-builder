import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ crumbs = [] }) {
  return (
    <nav class="flex mt-5 py-3 px-3 text-gray-700  dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-1">
        {crumbs.map((crumb, i, row) => (
          <div class="flex items-center gap-1 md:gap-2" key={i}>
            <Link
              to={crumb.link}
              className={`inline-flex capitalize items-center text-sm font-medium ${
                i + 1 === row.length ? "text-gray-400 md:ml-2 dark:text-gray-500" : "text-gray-700 hover:text-gray-900"
              } dark:text-gray-400 dark:hover:text-white`}
            >
              {crumb.text}
            </Link>
            {i + 1 !== row.length && <ChevronRightIcon className="w-6 h-6 text-gray-400" />}
          </div>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
