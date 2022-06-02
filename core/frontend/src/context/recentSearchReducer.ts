import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface recentSearch {
  image: string,
  title: string,
  subtitle: string
}

const initialState: recentSearch[] = []

export const recentSearchReducer = createSlice({
  name: "recentSearch",
  initialState,
  reducers: {
    setRecentSearches(state, action: PayloadAction<recentSearch[]>) {
      return [...action.payload, ...state];
    },
    addRecentSearch(state, action: PayloadAction<recentSearch>) {
      state.unshift(action.payload);
    },
    deleteRecentSearch(state, action: PayloadAction<string>) {
      return state.filter(item => {return item.title !== action.payload});
    },
    updateRecentSearches(state, action: PayloadAction<string>) {
      let updatedRecentSearch = state.filter(item => {
        return item.title === action.payload
      });
      let stateWithOutUpdatedRecentSearch = state.filter(item => {
        return item.title !== action.payload
      });

      return [
        ...updatedRecentSearch,
        ...stateWithOutUpdatedRecentSearch
      ]
    },
    clearRecentSearches() {
      return [];
    }
  }
})

export default recentSearchReducer.reducer;
