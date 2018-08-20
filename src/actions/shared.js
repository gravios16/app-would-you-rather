import { getInitialData, saveQuestionAnswer } from '../utils/api'

import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'

import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return dispatch => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export function handleAnswerQuestion (questionAnswer) {
  return dispatch => {

    dispatch(showLoading())

    return saveQuestionAnswer(questionAnswer)
    .then(() => dispatch(hideLoading()))
    .then(() => dispatch(handleInitialData()))
  }
}