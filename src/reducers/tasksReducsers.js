"use strict";

export const tasksReducers = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case "CREATE_TASK":
      return { tasks: [...state.tasks, ...action.payload] };
      break;
    case "DELETE_TASK":
      const currentTaskToDelete = [...state.tasks];
      const indexToDelete = currentTaskToDelete.findIndex(task => {
        return task.id === action.payload.id;
      });
      return {
        tasks: [...currentTaskToDelete.slice(0, indexToDelete), ...currentTaskToDelete.slice(indexToDelete + 1)]
      };

    case "UPDATE_TASK":
      //Create copy of current array of tasks
      const currentTaskToUpdate = [...state.tasks];
      const indexToUpdate = currentTaskToUpdate.findIndex(task => {
        return task.id === action.payload.id;
      });
      const newTaskToUpdate = {
        ...currentTaskToUpdate[indexToUpdate],
        action: action.payload.action,
        dateAdded: action.payload.dateAdded
      };
      console.log("task to be updated", newTaskToUpdate);
      return {
        tasks: [
          ...currentTaskToUpdate.slice(0, indexToUpdate),
          newTaskToUpdate,
          ...currentTaskToUpdate.slice(indexToUpdate + 1)
        ]
      };

    default:
      break;
  }
};
