export const resourcesReducers = (
  state = {
    resources: [{ Todos: [{}], Users: [{}] }],
    isLoading: false,
    openModal: false
  },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { openModal: action.payload };
    case "IS_LOADING":
      return { openModal: action.payload };

    case "GET_RESOURCES":
      console.log("getting resources---", state);
      return { ...state, resources: [...state.resources] };
      break;
    case "CREATE_RESOURCE":
      return { users: [...state.users, ...action.payload] };
      break;
    case "UPDATE_RESOURCE":
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
      break;
    case "DELETE_RESOURCE":
      const currentUserToDelete = [...state.users];
      const indexToDelete = currentUserToDelete.findIndex(user => {
        return user.id === action.payload.id;
      });
      return {
        users: [...currentUserToDelete.slice(0, indexToDelete), ...currentUserToDelete.slice(indexToDelete + 1)]
      };
      break;
    default:
      break;
  }
  return state;
};
