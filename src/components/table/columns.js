import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DuplicateIcon, EyeIcon } from "@heroicons/react/outline";

export default () => [
  {
    Header: "Id",
    accessor: "id",
    Cell: ({ cell: { value } }) => {
      return (
        <Link
          to={`/settings/formbuilder/${value}`}
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          {value}
        </Link>
      );
    },
  },
  {
    Header: " Name",
    accessor: "name",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell: { value } }) => {
      if (value === "active")
        return <span className="text-xs text-emerald-600 bg-green-100 uppercase rounded-md px-2 py-1">{value}</span>;
      if (value === "draft")
        return <span className="text-xs text-yellow-600 bg-yellow-100 uppercase rounded-md px-2 py-1">{value}</span>;

      return <span className="text-xs text-gray-600 bg-gray-100 uppercase rounded-md px-2 py-1">{value}</span>;
    },
  },
  {
    Header: "Options",
    accessor: "options",
    Cell: (data) => {
      const [clicked, setClick] = React.useState("copy the link....");
      const navigate = useNavigate();

      function onCopyClick(e) {
        e.preventDefault();
        setClick("copied!!...");
        navigator.clipboard.writeText(
          `${window.location.protocol + "//" + window.location.host}/register/${data.cell.row.original.id}`
        );
        setTimeout(() => setClick("copy the link...."), 2000);
      }

      function onDetailClick(e) {
        e.preventDefault();
        navigate(`/settings/formbuilder/${data.cell.row.original.id}`);
      }

      return (
        <div className="flex items-center gap-2">
          <div class="relative flex flex-col items-center group">
            <DuplicateIcon onClick={onCopyClick} className="h-5 w-5 cursor-pointer" />
            <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded cursor-pointer">
                {clicked}
              </span>
            </div>
          </div>
          <EyeIcon className="h-5 w-5 cursor-pointer" onClick={onDetailClick} />
        </div>
      );
    },
  },
];
