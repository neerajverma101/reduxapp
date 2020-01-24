import React, { Component } from "react";
import ListUsers from "./components/ListUsers";
import ListTasks from "./components/ListTasks";

class App extends Component {
  render() {
    return (
      <div>
        <ListUsers></ListUsers>
        <ListTasks></ListTasks>
      </div>
    );
  }
}

export default App;
