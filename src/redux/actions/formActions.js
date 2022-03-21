import {
  ALL_FORMS_REQUEST,
  ALL_FORMS_SUCCESS,
  ALL_FORMS_FAILURE,
  ADD_FORM_REQUEST,
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILURE,
  UPDATE_FORM_REQUEST,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILURE,
} from "../constants";

import { getForms, addForm, updateForm } from "../../api/formApi";

export function getAllForms() {
  return function (dispatch) {
    dispatch({ type: ALL_FORMS_REQUEST });
    return getForms()
      .then((forms) => dispatch({ type: ALL_FORMS_SUCCESS, payload: forms }))
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
        dispatch({ type: ADD_FORM_SUCCESS, payload: { ...formData, wizard: false, new: true, id: form.id } });
      })
      .catch((err) => {
        dispatch({ type: ADD_FORM_FAILURE, payload: err.message });
        throw err;
      });
  };
}

export function modifyForm(formData = {}, id = null) {
  return function (dispatch) {
    return updateForm(formData, id)
      .then(() => getAllForms()(dispatch))
      .catch((err) => {
        dispatch({ type: UPDATE_FORM_FAILURE, payload: err.message });
        throw err;
      });
  };
}
