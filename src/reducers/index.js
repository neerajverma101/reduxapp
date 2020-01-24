"use strict";
import { combineReducers } from "redux";
import { tasksReducers } from "./tasksReducsers";
import { usersReducers } from "./usersReducers";

export default combineReducers({
  users: usersReducers,
  tasks: tasksReducers
});
