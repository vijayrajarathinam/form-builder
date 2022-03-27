import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { getAllForms } from "../../redux/actions/formActions";
import Table, { columnArray } from "../../components/table";
import Breadcrumb from "../../components/commons/Breadcrumb";
import CreateFormModal from "./CreateFormModal";
import Button from "../../components/commons/Button";

function OnboardingForms() {
  const columns = useMemo(columnArray, []);
  const { error, data, loading } = useSelector((state) => state.forms);
  const tableProps = useTable({ columns, loading, data });
  const [modal, showModal] = useState(false);
  const handleClose = () => showModal(false);
  const dispatch = useDispatch();

  useEffect(() => {
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
          { link: "/", text: "dashboard" },
          { link: "/settings", text: "settings" },
          { link: "/settings/formbuilder", text: "form builder" },
        ]}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Onboarding Forms</h2>
        <Button.Default Icon={PlusCircleIcon} text="Add New Form" onClick={() => showModal(true)} />
      </div>
      <Table {...tableProps} />
      <CreateFormModal show={modal} handleClose={handleClose} />
    </motion.div>
  );
}

export default OnboardingForms;
