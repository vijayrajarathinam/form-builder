import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllForms } from "../redux/actions/formActions";
import Register from "../components/register";

function RegisterPage() {
  const { error, data, loading } = useSelector((state) => state.forms);
  const [form, setForm] = useState({ name: "Form Heading", formStatus: "loading", struct: {} });
  const dispatch = useDispatch();
  const { formId } = useParams();

  React.useEffect(() => {
    dispatch(getAllForms());

    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
  }, []);

  React.useEffect(() => {
    if (data && loading === false) {
      setForm({ ...data.find((d) => d.id === formId), formStatus: "progress" });
    }
  }, [data, loading]);
  return <Register data={form} />;
}

export default RegisterPage;
