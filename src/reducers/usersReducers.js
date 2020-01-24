"use strict";

export const usersReducers = (
  state = {
    users: [
      { id: 1, name: "user a", email: "usera@gmail.com" },
      { id: 2, name: "user b", email: "userb@gmail.com" }
    ]
  },
  action
) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, users: [...state.users] };
    case "CREATE_USER":
      return { users: [...state.users, ...action.payload] };
      break;
    case "DELETE_USER":
      const currentUserToDelete = [...state.users];
      const indexToDelete = currentUserToDelete.findIndex(user => {
        return user.id === action.payload.id;
      });
      return {
        users: [...currentUserToDelete.slice(0, indexToDelete), ...currentUserToDelete.slice(indexToDelete + 1)]
      };

    case "UPDATE_USER":
      //Create copy of current array of users
      const currentUserToUpdate = [...state.users];
      const indexToUpdate = currentUserToUpdate.findIndex(user => {
        return user.id === action.payload.id;
      });
      const newUserToUpdate = {
        ...currentUserToUpdate[indexToUpdate],
        name: action.payload.name,
        email: action.payload.email
      };
      console.log("user to be updated", newUserToUpdate);
      return {
        users: [
          ...currentUserToUpdate.slice(0, indexToUpdate),
          newUserToUpdate,
          ...currentUserToUpdate.slice(indexToUpdate + 1)
        ]
      };

    default:
      break;
  }
  return state;
};
