"use strict";

export const getResources = () => {
  return {
    type: "GET_RESOURCES"
  };
};

//Create Resource
export const createResource = (resource, resourceType) => {
  return {
    type: "CREATE_RESOURCE",
    payload: { resource, resourceType }
  };
};

export const deleteResource = (id, resourceType) => {
  return {
    type: "DELETE_RESOURCE",
    payload: { id, resourceType }
  };
};

export const updateResource = (resource, resourceType) => {
  return {
    type: "UPDATE_RESOURCE",
    payload: { resource, resourceType }
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
