export const resourcesReducers = (
  state = {
    todos: [],
    users: [],
    isLoading: false,
    openModal: false,
    name: "",
    email: "",
    actionName: "",
    dateAdded: "",
    activeResource: "1"
  },
  action
) => {
  switch (action.type) {
    case "SET_ACTIVE_RESOURCE":
      return { ...state, activeResource: action.payload };

    case "SET_INPUT":
      let value = action.payload.value;
      let field = action.payload.key;
      return { ...state, [field]: value };

    case "OPEN_MODAL":
      return { ...state, openModal: action.payload };
    case "IS_LOADING":
      console.log("isloading payload", action.payload);
      return { ...state, isLoading: action.payload };

    case "GET_RESOURCES":
      console.log("getting resources---", state);
      let todos = localStorage.getItem("todos");
      todos = JSON.parse(todos);
      let users = localStorage.getItem("users");
      users = JSON.parse(users);
      if (!todos || !users) {
        return { ...state };
      } else {
        return { ...state, todos, users };
      }
      break;
    case "CREATE_RESOURCE":
      if (action.payload === "user") {
        console.log("creating a user", state);
        let id = !state.users ? 0 : 1 + state.users.length;
        console.log("creating resource", state);
        let data = { id: id, name: state.name, email: state.email };
        let usersData = !state.users && state.users.length ? [data] : [...state.users, data];
        console.log("usersdata data---", usersData);
        localStorage.setItem("users", JSON.stringify(usersData));
        return { ...state, users: usersData };
      } else {
        console.log("creating a todo", state);
        let id = !state.todos ? 0 : 1 + state.todos.length;
        let data = {
          id: id,
          actionName: state.actionName,
          dateAdded: state.dateAdded
        };
        let todosData = !state.todos ? [data] : [...state.todos, data];
        console.log("todos data---", todosData);
        localStorage.setItem("todos", JSON.stringify(todosData));
        return { ...state, todos: todosData };
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
        users: [...currentUserToDelete.slice(0, indexToDelete), ...currentUserToDelete.slice(indexToDelete + 1)]
      };
      break;
    default:
      break;
  }
  return state;
};
