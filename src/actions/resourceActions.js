"use strict";

export const getResources = () => {
  return {
    type: "GET_RESOURCES"
  };
};

//Create Resource
export const createResource = resource => {
  return {
    type: "CREATE_RESOURCE",
    payload: resource
  };
};

export const deleteResource = id => {
  return {
    type: "DELETE_RESOURCE",
    payload: id
  };
};

export const updateResource = (id, value1, value2) => {
  return {
    type: "UPDATE_RESOURCE",
    payload: { id, value1, value2 }
  };
};

export const handleModal = value => {
  return {
    type: "OPEN_MODAL",
    payload: value
  };
};

export const handleLoading = value => {
  return {
    type: "IS_LOADING",
    payload: value
  };
};

export const handleInput = (key, value) => {
  return {
    type: "SET_INPUT",
    payload: { key, value }
  };
};

export const handleActiveResource = key => {
  return {
    type: "SET_ACTIVE_RESOURCE",
    payload: key
  };
};
