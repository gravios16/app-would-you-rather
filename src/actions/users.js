export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addUserQuestion (userId, questionId) {
  return {
    type: ADD_USER_QUESTION,
    userId,
    questionId
  }
}

export function addUserAnswer (userId, questionId, answer) {
  return {
    type: ADD_USER_ANSWER,
    userId,
    questionId,
    answer
  }
}