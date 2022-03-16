import { combineReducers } from "redux";

import forms from "./formReducer";
// import authors from "./authorReducer";
// import apiCallInProgress from "./apiStatusReducer";
import { reducer as reduxFormReducer } from "redux-form";
// import validate from "./validate";
// combineReducers({
//     form: formReducer.validation({
//       syncValidation: validate // "syncValidation" is the form name given to reduxForm() decorator
//     })

const rootReducer = combineReducers({
  forms,
  form: reduxFormReducer,
});

export default rootReducer;
