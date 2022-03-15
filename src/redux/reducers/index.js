import { combineReducers } from "redux";

import forms from "./formReducer";
// import authors from "./authorReducer";
// import apiCallInProgress from "./apiStatusReducer";
import { reducer as reduxFormReducer } from "redux-form";

const rootReducer = combineReducers({ forms, form: reduxFormReducer });

export default rootReducer;
