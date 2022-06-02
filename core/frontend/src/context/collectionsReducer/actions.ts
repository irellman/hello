import axios from "axios";
import {Dispatch} from "@reduxjs/toolkit";
import {collectionsReducer} from "./reducer";

export const createNewCollection = (collectionName: string) => {
  return async (dispatch: Dispatch) => {
    const { addCollection } = collectionsReducer.actions;
    const formData = new FormData();
    formData.append("collection_name", collectionName);

    const res = await axios.post("http://127.0.0.1:8000/api/collection/create", formData);
    const data = res.data;

    dispatch(addCollection(data));
  }
}

export const getCollections = () => {
  return async (dispatch: Dispatch) => {
    const { setCollections } = collectionsReducer.actions;
    const res = await axios.post("http://127.0.0.1:8000/api/collections/get");
    const data = res.data;

    if (data.length) {
      dispatch(setCollections(data));
    }
  }
}

export const deleteCollection = (id: number) => {
  return async (dispatch: Dispatch) => {
    const formData = new FormData();
    const { removeCollection } = collectionsReducer.actions;
    formData.append("collection_id", String(id));
    const res = await axios.post("http://127.0.0.1:8000/api/collection/delete", formData)
    const data = res.data;

    if (data.status === "ok") {
      dispatch(removeCollection(id));
    }
  }
}

export const renameCollection = (id: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const formData = new FormData();
    const { renameCollection } = collectionsReducer.actions;

    formData.append("collection_id", String(id));
    formData.append("collection_name", name);

    const res = await axios.post("http://127.0.0.1:8000/api/collection/rename", formData);
    const data = res.data;

    if (data.status === "ok") {
      dispatch(renameCollection({id: Number(id), name: name}));
    }
  }
}
