import React from "react";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { getAllForms } from "../../redux/actions/formActions";
import Table, { columnArray } from "../../components/table";
import Breadcrumb from "../../components/commons/Breadcrumb";
import CreateFormModal from "./CreateFormModal";

function OnboardingForms() {
  const columns = React.useMemo(columnArray, []);
  const { error, data, loading } = useSelector((state) => state.forms);
  const tableProps = useTable({ columns, loading, data });
  const [modal, showModal] = React.useState(false);
  const handleClose = () => showModal(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllForms());
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
  }, []);

  return (
    <motion.div initial={{ x: "300px", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-300px", opacity: 0 }}>
      <Breadcrumb
        crumbs={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/settings", text: "settings" },
          { link: "/formbuilder", text: "form builder" },
        ]}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Onboarding Forms</h2>
        <button
          onClick={(e) => showModal(true)}
          className="h-10 md:h-15 inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline"
        >
          <PlusCircleIcon className="w-4 h-4" />
          Add New Form
        </button>
      </div>
      <Table {...tableProps} />
      <CreateFormModal show={modal} handleClose={handleClose} />
    </motion.div>
  );
}

export default OnboardingForms;