import {
  ALL_FORMS_SUCCESS,
  ALL_FORMS_REQUEST,
  ALL_FORMS_FAILURE,
  ADD_FORM_REQUEST,
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILURE,
  UPDATE_FORM_REQUEST,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILURE,
  CLEAR_ERRORS,
} from "../constants";
import initialState from "./initialState";
import produce from "immer";

export default function formReducer(state = initialState.forms, action) {
  if (action.type === ALL_FORMS_REQUEST) return { loading: true, data: [], error: {} };
  if (action.type === ALL_FORMS_SUCCESS) return { loading: false, data: action.payload, error: {} };
  if (action.type === ALL_FORMS_FAILURE) return { loading: false, error: action.payload, data: [] };

  if (action.type === ADD_FORM_REQUEST) return { loading: true, data: [...state.data], error: {} };
  if (action.type === ADD_FORM_SUCCESS) return { loading: false, data: [...state.data, action.payload], error: {} };
  if (action.type === ADD_FORM_FAILURE) return { loading: false, error: action.payload, data: [] };

  if (action.type === UPDATE_FORM_REQUEST) return state;
  // return { loading: true, data: [...state.data], error: {} };
  if (action.type === UPDATE_FORM_SUCCESS) {
    console.log(state);
    return {
      loading: false,
      data: produce(state.data, (draft) => {
        console.log(draft);
        draft[action.payload.id] = action.payload;
      }),
      error: {},
    };
  }
  if (action.type === UPDATE_FORM_FAILURE) return { loading: false, error: action.payload, data: [] };

  if (action.type === CLEAR_ERRORS) return { ...state, error: null };

  return state;
}
