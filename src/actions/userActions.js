"use strict";

export const getUsers = () => {
  return {
    type: "GET_USER"
  };
};

//Create User
export const createUser = user => {
  return {
    type: "CREATE_USER",
    payload: user
  };
};

export const deleteUser = id => {
  return {
    type: "DELETE_USER",
    payload: id
  };
};

export const updateUser = user => {
  return {
    type: "UPDATE_USER",
    payload: user
  };
};
