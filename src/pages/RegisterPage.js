import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllForms } from "../redux/actions/formActions";
import Register from "../components/register";
import { Helmet } from "react-helmet";
import NotFoundPage from "./NotFoundPage";

function RegisterPage() {
  const { error, data, loading } = useSelector((state) => state.forms);
  const [form, setForm] = useState({ name: "Loading....", formStatus: "loading", struct: {} });
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
      const result = data.find((d) => d.id === formId);
      console.log(result);
      if (result) setForm({ ...result, formStatus: "progress" });
      else setForm(null);
    }
  }, [data, loading]);

  if (form)
    return (
      <>
        <Helmet>
          <style>{`body { background-color: ${form?.bg_color || "#fff"}; }`}</style>
        </Helmet>
        <Register data={form} />
      </>
    );
  else return <NotFoundPage />;
}

export default RegisterPage;
