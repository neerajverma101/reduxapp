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
    fieldId: "",
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
        state.name = "";
        state.email = "";
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
        state.actionName = "";
        state.dateAdded = "";
        return { ...state, todos: todosData };
      }
      break;
    case "UPDATE_RESOURCE":
      const currentResourceToUpdate = state.activeResource === "1" ? [...state.todos] : [...state.users];
      const indexToUpdate = currentResourceToUpdate.findIndex(resource => {
        return resource.id === action.payload.id;
      });
      console.log("index to update", indexToUpdate);
      const newResourceToUpdate = {
        ...currentResourceToUpdate[indexToUpdate],
        [state.activeResource === "1" ? "actionName" : "name"]: action.payload.value1,
        [state.activeResource === "1" ? "dateAdded" : "email"]: action.payload.value2
      };
      console.log("user to be updated", newResourceToUpdate);
      return {
        users: [
          ...currentResourceToUpdate.slice(0, indexToUpdate),
          newResourceToUpdate,
          ...currentResourceToUpdate.slice(indexToUpdate + 1)
        ]
      };
      break;
    case "DELETE_RESOURCE":
      const currentResourceToDelete = state.activeResource === "1" ? state.todos : state.users;
      console.log("current res to delete", currentResourceToDelete);
      const indexToDelete = currentResourceToDelete.findIndex(resource => resource.id === action.payload);
      console.log("resource to delete", indexToDelete);
      let resourceType = state.activeResource === "1" ? "todos" : "users";
      console.log("resource type", resourceType);
      console.log("current res to delete", currentResourceToDelete);
      let data = [
        ...currentResourceToDelete.slice(0, indexToDelete),
        ...currentResourceToDelete.slice(indexToDelete + 1)
      ];
      localStorage.setItem([resourceType], JSON.stringify(data));

      return {
        ...state,
        [resourceType]: data
      };
      break;
    default:
      break;
  }
  return state;
};
