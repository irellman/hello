import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface appState {
  width: number
}

const initialState: appState = {
  width: document.body.offsetWidth
};

export const appReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setWidth(state, action: PayloadAction<number>) {
      state.width = action.payload;
    }
  }
});

export default appReducer.reducer;
