import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DuplicateIcon, EyeIcon, EyeOffIcon, ServerIcon } from "@heroicons/react/outline";
import { modifyForm } from "../../redux/actions/formActions";

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
    Cell: ({ cell: { value, row } }) => {
      return (
        <div className="flex gap-2 items-center">
          {value}
          {row.original.new ? (
            <span className="rounded text-xs font-bold px-1 py-0.25 bg-cyan-500 text-white">New</span>
          ) : (
            ""
          )}
        </div>
      );
    },
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
    Cell: ({ cell }) => {
      const [clicked, setClick] = React.useState("copy the link....");
      const navigate = useNavigate();
      const dispatch = useDispatch();

      function onCopyClick(e) {
        e.preventDefault();
        setClick("copied!!...");
        navigator.clipboard.writeText(
          `${window.location.protocol + "//" + window.location.host}/register/${cell.row.original.id}`
        );
        setTimeout(() => setClick("copy the link...."), 2000);
      }

      function onDetailClick(e) {
        e.preventDefault();
        navigate(`/settings/formbuilder/${cell.row.original.id}`);
      }

      function onStatusClick(e) {
        e.preventDefault();

        let form = cell.row.original;
        form["status"] = form.status == "active" ? "inactive" : "active";
        dispatch(modifyForm(form, cell.row.original.id));
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
          {cell.row.original.status == "active" ? (
            <EyeOffIcon className="h-5 w-5 cursor-pointer" onClick={onStatusClick} />
          ) : (
            <EyeIcon className="h-5 w-5 cursor-pointer" onClick={onStatusClick} />
          )}
          <ServerIcon className="h-5 w-5 cursor-pointer" onClick={onDetailClick} />
        </div>
      );
    },
  },
];
