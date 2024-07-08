import { applyMiddleware, legacy_createStore } from "redux";
import Reducer from "./Reducer";
import {thunk} from "redux-thunk";

const initialState = {
  tasklist: [],
  isAuth: false,
};

export const store = legacy_createStore(
  Reducer,
  initialState,
  applyMiddleware(thunk)
);
