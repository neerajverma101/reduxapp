import React, { Component } from "react";
import ListUsers from "./components/ListUsers";
import ListTasks from "./components/ListTasks";
import { Tabs, Button, Table, Tag, Divider, Modal, Input, Progress, DatePicker } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import moment from "moment";
import { bindActionCreators } from "redux";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  handleLoading,
  handleModal,
  handleInput,
  handleActiveResource
} from "./actions/resourceActions";

class App extends Component {
  componentDidMount() {
    this.props.getResources();
    console.log("component did mount this.props", this.props);
  }

  async wait(duration = 1000) {
    console.log("inside wait----");
    this.props.handleLoading(true);
    this.props.createResource(this.props.activeResource === "1" ? "todos" : "user");
    await new Promise(resolve =>
      setTimeout(() => {
        console.log("inside promise, resolve", resolve);
        this.props.handleLoading(false);
        this.props.handleModal(false);
      }, duration)
    );
  }

  render() {
    return (
      <div id="main" style={{ padding: "1%", paddingTop: 0 }}>
        <Tabs defaultActiveKey={this.props.activeResource} onChange={key => this.props.handleActiveResource(key)}>
          {["Todos", "Users"].map((e, i) => {
            return (
              <Tabs.TabPane tab={e} key={i + 1}>
                <div id="create">
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      console.log("button clicked");
                      this.props.handleModal(true);
                    }}
                  >
                    Create {e.slice(0, -1)}
                  </Button>
                  <Modal
                    visible={this.props.openModal}
                    title={"Create a " + e.slice(0, -1)}
                    onCancel={e => {
                      e.preventDefault();
                      this.props.handleModal(false);
                    }}
                    footer={[
                      <Button
                        key="submit"
                        loading={this.props.isLoading}
                        onClick={e => {
                          e.preventDefault();

                          if (
                            !this.props.actionName ||
                            !this.props.dateAdded ||
                            !this.props.name ||
                            !this.props.email
                          ) {
                            console.log("fields empty");
                            this.wait(2000);
                          } else {
                            console.log("fields not empty");
                            let temp = {};
                            if (this.props.activeResource === "1") {
                              temp = {
                                actionName: this.props.actionName,
                                dateAdded: this.props.dateAdded
                              };
                              console.log("update data", temp);

                              this.props.updateResource(this.props.fieldId, temp.actionName, temp.dateAdded);
                            } else {
                              temp = {
                                name: this.props.name,
                                email: this.props.email
                              };
                              console.log("update data", temp);

                              this.props.updateResource(this.props.id, temp.name, temp.email);
                            }
                          }
                        }}
                      >
                        Save
                      </Button>,
                      <Button
                        key="back"
                        onClick={e => {
                          e.preventDefault();
                          this.props.handleModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                    ]}
                  >
                    <div>
                      <Input
                        style={{ marginBottom: "10px" }}
                        placeholder={this.props.activeResource === "1" ? "Enter an action" : "Enter a name"}
                        onChange={e => {
                          e.preventDefault();
                          this.props.handleInput(
                            this.props.activeResource === "1" ? "actionName" : "name",
                            e.target.value
                          );
                        }}
                        required
                      />
                      {this.props.activeResource === "1" ? (
                        <DatePicker
                          format="DD-MM-YYYY"
                          disabledDate={currentDate => {
                            return currentDate && currentDate < moment(new Date(), "DD-MM-YYYY");
                          }}
                          onChange={(date, dateString) => {
                            console.log("date selected", date, dateString);
                            this.props.handleInput("dateAdded", date);
                          }}
                        ></DatePicker>
                      ) : (
                        <Input
                          placeholder="Enter an email"
                          onChange={e => {
                            e.preventDefault();
                            this.props.handleInput("email", e.target.value);
                          }}
                          type="email"
                        />
                      )}
                    </div>
                  </Modal>
                </div>
                <div id="content" style={{ marginTop: "15px" }}>
                  {/* content of {e} */}
                  <Table
                    rowKey={row => row.id}
                    columns={[
                      {
                        title: "Name",

                        dataIndex: this.props.activeResource === "1" ? "actionName" : "name"
                      },
                      {
                        title: "Action",

                        render: data => (
                          <span>
                            <a
                              onClick={() => {
                                // this.props.handleInput(this.props.activeResource==="1"?"actionName":"name")
                                // this.props.handleInput(this.props.activeResource==="1"?"dateAdded":"email")
                                if (this.props.activeResource === "1") {
                                  this.props.handleInput("actionName", data.actionName);
                                  this.props.handleInput("dateAdded", data.dateAdded);
                                  this.props.handleModal(true);
                                } else {
                                  this.props.handleInput("name", data.name);
                                  this.props.handleInput("email", data.email);
                                  this.props.handleInput("fieldId", data.id);
                                  this.props.handleModal(true);
                                }
                                // let temp={}
                                // if(this.props.activeResource==="1"){
                                //   temp={
                                //     actionName:data.actionName,
                                //     dateAdded:data.dateAdded
                                //   }
                                //   console.log("update data",data)

                                //   this.props.updateResource(data.id,temp.actionName,temp.dateAdded)
                                // }
                                // else{
                                //   temp={
                                //     name:data.name,
                                //     email:data.email
                                //   }
                                //   console.log("update data",data)

                                //   this.props.updateResource(data.id,temp.name,temp.email)
                                // }
                              }}
                            >
                              Edit{" "}
                            </a>
                            <Divider type="vertical" />
                            <a
                              onClick={() => {
                                console.log("delelte row", data.id);
                                this.props.deleteResource(data.id);
                              }}
                            >
                              Delete{" "}
                            </a>
                          </span>
                        )
                      }
                    ]}
                    dataSource={this.props.activeResource === "1" ? this.props.todos : this.props.users}
                  />
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
    users: state.resources.users,
    todos: state.resources.todos,
    isLoading: state.resources.isLoading,
    openModal: state.resources.openModal,
    activeResource: state.resources.activeResource
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getResources,
      createResource,
      updateResource,
      deleteResource,
      handleModal,
      handleLoading,
      handleInput,
      handleActiveResource
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
