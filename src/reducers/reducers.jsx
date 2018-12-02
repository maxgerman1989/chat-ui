import TYPES from "../actions/types";
import { combineReducers } from "redux";

export const avatar = (state = "", action) =>
  action.type === TYPES.SET_AVATAR ? action.data : state;

export const username = (state = "", action) =>
  action.type === TYPES.SET_USERNAME ? action.data : state;

export const message = (state = "", action) => {
  return state;
};

export const messages = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ADD_MESSAGE:
      return [...state, action.data];
    default:
      return state;
  }
};

export default combineReducers({
  user: combineReducers({
    avatar,
    username,
    message
  }),
  messages
});
