import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'

import { Link, withRouter, NavLink } from 'react-router-dom'

class QuestionPage extends Component {
  state = {
    selectedOption: 'optionOne'
  }

  answer = (e) => {
    e.preventDefault()
    const { questions, authedUser, users, id } = this.props
    let questionAnswer = {
      authedUser: authedUser.id,
      qid: id,
      answer: this.state.selectedOption
    }

    this.props.dispatch(handleAnswerQuestion(questionAnswer))
    //this.props.dispatch(setAuthedUser(users[authedUser.id]))
  }

  handleOptionChange = (e) => {
    const selectedOption = e.target.value
    this.setState(() => ({
      selectedOption
    }))
  }

  render() {
    const { question } = this.props

    return (
      <section className="section">
        <div className='container'>
          <div className="box">
            <article className="media question-container">
              <div className="media-left">
                <figure className="image is-96x96 is-1by1">
                  <img src={question.authorInfo.avatarURL} alt="Image"/>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                    <strong>{question.authorInfo.name}</strong> <small>asks:</small>
                    <hr className="question-divider"/>
                    <div className="question-info">

                    {question.isAnswered == false ? (
                      <Fragment>
                        <p>
                          <strong>Would you rather?</strong>
                          <br/>

                          <label className="radio">
                            <input type="radio" value="optionOne"
                              checked={this.state.selectedOption == 'optionOne'}
                              onChange={this.handleOptionChange}
                            />
                            <small>{question.optionOne.text}</small>
                          </label>
                          <br/>
                          <label className="radio">
                            <input type="radio" value="optionTwo"
                              checked={this.state.selectedOption == 'optionTwo'}
                              onChange={this.handleOptionChange}
                            />
                            <small>{question.optionTwo.text}</small>
                          </label>
                        </p>
                        <a className="button is-success" onClick={this.answer}>Submit</a>
                      </Fragment>
                    ):(
                      <Fragment>
                        <strong>Results:</strong>
                        <br/>

                        <p>
                          <strong>1.-) </strong>
                          <small>{question.optionOne.text}</small>
                          { question.yourVoteA && (<span className="your-vote">Your vote</span>) }
                          <br/>
                          <small>
                            <strong>({question.aPercent}%)</strong>... {question.optionOne.votes.length} of {question.totalVotes} votes
                          </small>
                        </p>

                        <hr className="question-divider"/>

                        <p>
                          <strong>2.-) </strong>
                          <small>{question.optionTwo.text}</small>
                          { question.yourVoteB && (<span className="your-vote">Your vote</span>) }
                          <br/>
                          <small>
                            <strong>({question.bPercent}%)</strong>... {question.optionTwo.votes.length} of {question.totalVotes} votes
                          </small>
                        </p>
                          <hr className="question-divider"/>

                      </Fragment>
                    )}


                    </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps ({authedUser, questions, users}, props) {
  const { id } = props.match.params
  const totalVotes = questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length
  const question = {
    ...questions[id],
    isAnswered: Object.keys(authedUser.answers).includes(id),
    authorInfo: users[questions[id].author],
    yourVoteA: questions[id].optionOne.votes.includes(authedUser.id),
    yourVoteB: questions[id].optionTwo.votes.includes(authedUser.id),
    aPercent: (questions[id].optionOne.votes.length/totalVotes)*100,
    bPercent: (questions[id].optionTwo.votes.length/totalVotes)*100,
    totalVotes
  }

  return {
    question
  }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))