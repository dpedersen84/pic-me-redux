import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import questionReducer from "./questionReducer";
import picReducer from "./picReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  questions: questionReducer,
  pics: picReducer,
  profile: profileReducer
});
