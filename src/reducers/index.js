"use strict";
import { combineReducers } from "redux";
import { resourcesReducers } from "./resourcesReducers";

export default combineReducers({
  resources: resourcesReducers
});
