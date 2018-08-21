import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserQuestion, addUserAnswer } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_VOTE = 'ADD_QUESTION_VOTE'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function addQuestionVote (userId, questionId, answer) {
  return {
    type: ADD_QUESTION_VOTE,
    userId,
    questionId,
    answer
  }
}

export function handleAddQuestion ({optionOneText, optionTwoText, userId }) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return saveQuestion({optionOneText, optionTwoText, author: userId })
    .then((question) => {
      dispatch(addQuestion(question))
      dispatch(addUserQuestion(userId, question.id))
    })
    .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleAnswerQuestion (userId, questionId, questionAnswer) {
  return dispatch => {
    dispatch(showLoading())
    return saveQuestionAnswer({ authedUser: userId, qid: questionId, answer: questionAnswer })
    .then(() => {
      dispatch(addUserAnswer(userId, questionId, questionAnswer))
      dispatch(addQuestionVote(userId, questionId, questionAnswer))
    })
    .then(() => dispatch(hideLoading()))
  }
}