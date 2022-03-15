import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllForms } from "../redux/actions/formActions";
import Register from "../components/register";

const data = {
  id: "163mimHmcJfCe9L7tyku",
  status: "active",
  name: "Client Onboarding",
  struct: {
    sections: [
      {
        rows: [
          {
            columns: [
              {
                text: "First Name",
                isRequired: true,
                label: "first_name",
                type: "text",
                subText: "as per aadhaar",
              },
              {
                label: "middle_name",
                type: "text",
                text: "Middle Name",
                isRequired: false,
              },
              {
                type: "text",
                isRequired: true,
                text: "Last Name",
                label: "last_name",
              },
            ],
          },
          {
            columns: [
              {
                text: "email",
                isRequired: false,
                type: "email",
                label: "email",
                useAsUsername: true,
              },
              {
                type: "text",
                label: "phone_number",
                text: "phone number",
                isRequired: false,
              },
            ],
          },
        ],
        name: "Personal details",
      },
      {
        rows: [
          {
            columns: [
              {
                isRequired: false,
                label: "address_line_1",
                text: "Address line 1",
                type: "text",
              },
            ],
          },
          {
            columns: [
              {
                type: "text",
                text: "address line 2",
                label: "address_line_2",
                isRequired: false,
              },
            ],
          },
          {
            columns: [
              {
                text: "state name",
                isRequired: false,
                label: "state_name",
                type: "dropdown",
                options: [
                  { id: 1, name: "yes", value: "yes" },
                  { id: 1, name: "no", value: "no" },
                ],
              },
              {
                type: "file",
                label: "pincode",
                isRequired: false,
                text: "Pincode",
              },
            ],
          },
        ],
        name: "Address",
      },
      {
        name: "Document",
        rows: [
          {
            columns: [
              {
                label: "do_you_have_addhaar_card?",
                text: "Do you have addhaar card?",
                isRequired: true,
                type: "radio",
                options: [
                  {
                    value: "yes",
                    name: "yes",
                  },
                  {
                    name: "no",
                    value: "no",
                  },
                ],
              },
              {
                label: "uan_number",
                type: "text",
                text: "If you have Aadhaar card please provide the UAN number",
                isRequired: false,
              },
            ],
          },
          {
            columns: [
              {
                text: "Do you agree for terms and conditions?",
                type: "checkbox",
                isRequired: true,
                label: "do_you_agree_for_terms_and_conditions?",
              },
            ],
          },
        ],
      },
    ],
  },
};

function RegisterPage() {
  //   const { error, data, loading } = useSelector((state) => state.forms);
  //   const [form, setForm] = React.useState({ name: "Form Heading", struct: {} });
  //   const dispatch = useDispatch();
  //   const { formId } = useParams();

  // //   React.useEffect(() => {
  // //     dispatch(getAllForms());

  // //     if (error) {
  // //       toast.error(error);
  // //       // dispatch(clearErrors());
  // //     }
  // //   }, []);

  // //   React.useEffect(() => {
  // //     if (data && loading === false) setForm(data.find((d) => d.id === formId));
  // //   }, [data, loading]);
  return <Register data={data} />;
}

export default RegisterPage;
