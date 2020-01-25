import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUsers } from "../actions/userActions";
class ListUsers extends Component {
  componentDidMount() {
    //Dispatch an action
    this.props.getUsers();
  }

  render() {
    console.log("users: ", this.props.users);
    return <div>users list</div>;
  }
}
function mapStateToProps(state) {
  return {
    users: state.users.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers: getUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
