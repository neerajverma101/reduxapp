export const resourcesReducers = (
  state = {
    todos: [{}],
    users: [{}],
    isLoading: false,
    openModal: false,
    name: "",
    email: "",
    action: "",
    dateAdded: ""
  },
  action
) => {
  switch (action.type) {
    case "SET_INPUT":
      let value = action.payload.value;
      let field = action.payload.key;
      return { [field]: value };

    case "OPEN_MODAL":
      return { openModal: action.payload };
    case "IS_LOADING":
      return { openModal: action.payload };

    case "GET_RESOURCES":
      console.log("getting resources---", state);
      let todos = localStorage.getItem("todos");
      let users = localStorage.getItem("users");
      return { todos, users };
      break;
    case "CREATE_RESOURCE":
      if (action.payload === "user") {
        let id = !state.users ? 0 : ++state.users.length;
        let data = { id: id, name: state.name, email: state.email };
        let usersData = !state.todos ? [data] : [...state.users, data];
        localStorage.setItem("users", JSON.stringify(usersData));
        return { users: usersData };
      } else {
        let id = !state.todos ? 0 : ++state.todos.length;
        let data = {
          id: id,
          actionName: state.action,
          dateAdded: state.dateAdded
        };
        let todosData = !state.todos ? [data] : [...state.todos, data];
        localStorage.setItem("todos", JSON.stringify(todosData));
        return { todos: todosData };
      }
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
        users: [
          ...currentUserToDelete.slice(0, indexToDelete),
          ...currentUserToDelete.slice(indexToDelete + 1)
        ]
      };
      break;
    default:
      break;
  }
  return state;
};
