import {
  ALL_FORMS_REQUEST,
  ALL_FORMS_SUCCESS,
  ALL_FORMS_FAILURE,
  ADD_FORM_REQUEST,
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILURE,
} from "../constants";

import { getForms, addForm } from "../../api/formApi";

export function getAllForms() {
  return function (dispatch) {
    dispatch({ type: ALL_FORMS_REQUEST });
    return getForms()
      .then((forms) => {
        console.log(forms);
        dispatch({ type: ALL_FORMS_SUCCESS, payload: forms });
      })
      .catch((err) => {
        dispatch({ type: ALL_FORMS_FAILURE, payload: err.message });
        throw err;
      });
  };
}

export function addNewForm(formData = {}) {
  return function (dispatch) {
    dispatch({ type: ADD_FORM_REQUEST });
    return addForm(formData)
      .then((form) => {
        // console.log(forms);
        // console.log(forms.id);
        dispatch({ type: ADD_FORM_SUCCESS, payload: { ...formData, id: form.id } });
      })
      .catch((err) => {
        dispatch({ type: ADD_FORM_FAILURE, payload: err.message });
        throw err;
      });
  };
}
