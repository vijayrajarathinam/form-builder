import { LOAD_COURSES_SUCCESS } from "../constants";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, endApiCall } from "./apiStatusActions";

export function getCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => dispatch({ type: LOAD_COURSES_SUCCESS, courses }))
      .catch((err) => {
        dispatch(endApiCall());
        throw err;
      });
  };
}
