"use strict";
import { combineReducers } from "redux";
import { tasksReducers } from "./tasksReducers";
import { usersReducers } from "./usersReducers";
import { resourcesReducers } from "./resourcesReducers";

export default combineReducers({
  resources: resourcesReducers
});
