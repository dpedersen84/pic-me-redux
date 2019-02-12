import {
  ADD_PIC,
  GET_PICS,
  GET_PIC,
  GET_USER_PICS,
  PIC_LOADING,
  DELETE_PIC
} from "../actions/types";

const initialState = {
  pics: [],
  pic: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PIC_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PICS:
      return {
        ...state,
        pics: action.payload,
        loading: false
      };
    case GET_PIC:
      return {
        ...state,
        pic: action.payload,
        loading: false
      };
    case GET_USER_PICS:
      return {
        ...state,
        pics: action.payload,
        loading: false
      };
    case ADD_PIC:
      return {
        ...state,
        pics: [action.payload, ...state.pics]
      };
    case DELETE_PIC:
      return {
        ...state,
        pics: state.pics.filter(pic => pic._id !== action.payload)
      };
    default:
      return state;
  }
}
