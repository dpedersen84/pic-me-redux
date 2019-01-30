import Questions from "../utils/Questions.json";

import { GET_QUESTION, QUESTION_LOADING } from "../actions/types";

// Get question
export const getQuestion = () => dispatch => {
  dispatch(setQuestionLoading());

  let randomQuestion = Questions[Math.floor(Math.random() * Questions.length)];

  dispatch({
    type: GET_QUESTION,
    payload: randomQuestion
  });
};

// Set loading state
export const setQuestionLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};
