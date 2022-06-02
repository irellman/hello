import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection } from "types/collection";

const initialState: collection[] = [];

export const collectionsReducer = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollections(state, action: PayloadAction<collection[]>) {
      return action.payload;
    },
    addCollection(state, action: PayloadAction<collection>) {
      return [
        ...state,
        action.payload
      ]
    },
    removeCollection(state, action: PayloadAction<number>) {
      return state.filter(collection => {return collection.id !== action.payload});
    },
    renameCollection(state, action: PayloadAction<{id: number, name: string}>) {
      const collection = state.find(item => {return item.id === action.payload.id});

      collection!.name = action.payload.name;
    },
    setImage(state, action: PayloadAction<{collectionId: number, image: string}>) {
      const collection = state.find(collection => {
        return collection.id === action.payload.collectionId;
      })!

      collection.image = action.payload.image;
    }
  }
});

export default collectionsReducer.reducer;
