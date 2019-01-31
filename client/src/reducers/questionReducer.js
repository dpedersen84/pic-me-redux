import { GET_QUESTION, QUESTION_LOADING } from "../actions/types";

const initialState = {
  question: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case QUESTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
