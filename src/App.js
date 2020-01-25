import React, { Component } from "react";
import ListUsers from "./components/ListUsers";
import ListTasks from "./components/ListTasks";
import { Tabs, Button, Table, Tag, Divider, Modal, Input, Progress } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { bindActionCreators } from "redux";
import { getResources, createResource, updateResource, deleteResource } from "./actions/resourceActions";

class App extends Component {
  componentDidMount() {
    this.props.getResources();
    console.log("component did mount this.props", this.props);
  }

  async wait(duration = 1000) {
    this.setState({ isLoading: true });
    await new Promise(resolve =>
      setTimeout(() => {
        console.log("resolve", resolve);
        this.setState({ isLoading: false, openModal: false });
      }, duration)
    );
  }

  render() {
    return (
      <div id="main" style={{ padding: "1%", paddingTop: 0 }}>
        <Tabs defaultActiveKey="1" onChange={key => console.log("key", key)}>
          {["Todos", "Users"].map((e, i) => {
            return (
              <Tabs.TabPane tab={e} key={i + 1}>
                <div id="create">
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ openModal: true });
                    }}
                  >
                    Create {e.slice(0, -1)}
                  </Button>
                  <Modal
                    visible={this.props.openModal}
                    title={"Create a " + e.slice(0, -1)}
                    onCancel={e => {
                      e.preventDefault();
                      this.setState({ openModal: false });
                    }}
                    footer={[
                      <Button
                        key="submit"
                        loading={this.props.isLoading}
                        onClick={e => {
                          e.preventDefault();
                          this.wait(2000);
                        }}
                      >
                        Save
                      </Button>,
                      <Button
                        key="back"
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ openModal: false });
                        }}
                      >
                        Cancel
                      </Button>
                    ]}
                  >
                    <div>
                      <Input style={{ marginBottom: "10px" }} placeholder="Enter name" required></Input>
                      <Input placeholder="Enter email" type="email"></Input>
                    </div>
                  </Modal>
                </div>
                <div id="content" style={{ marginTop: "15px" }}>
                  {/* content of {e} */}
                  <Table
                    columns={[
                      { title: "Name", dataIndex: "name", key: "name" },
                      {
                        title: "Action",
                        key: "action",
                        render: () => (
                          <span>
                            <a>Edit </a>
                            <Divider type="vertical"></Divider>
                            <a>Delete </a>
                          </span>
                        )
                      }
                    ]}
                    dataSource={[
                      { id: "1", name: "a" },
                      { id: "2", name: "b" }
                    ]}
                  ></Table>
                </div>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resources: state.resources.resources,
    users: state.resources.resources.users,
    todos: state.resources.resources.todos,
    isLoading: state.resources.isLoading,
    openModal: state.resources.openModal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getResources, createResource }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
