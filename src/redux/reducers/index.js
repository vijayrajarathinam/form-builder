import { combineReducers } from "redux";

import forms from "./formReducer";
// import authors from "./authorReducer";
// import apiCallInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({ forms });

export default rootReducer;
