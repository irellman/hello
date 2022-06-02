import authReducer from './auth/reducer';
import recentSearchReducer from './recentSearchReducer';
import userReducer from './userReducer/reducer';
import postsReducer from './postsReducer/reducer';
import collectionsReducer from "./collectionsReducer/reducer";
import appReducer from "./appReducer/reducer";
import currentPostReducer from "./currentPost/reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  postsReducer,
  userReducer,
  recentSearchReducer,
  currentPostReducer,
  authReducer,
  collectionsReducer,
  appReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"];
