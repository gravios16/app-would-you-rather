import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
  state = {
    selectedOption: 'optionOne'
  }

  answer = (e) => {
    e.preventDefault()
    const { authedUser, question } = this.props
    this.props.dispatch(handleAnswerQuestion(authedUser, question.id, this.state.selectedOption))
  }

  handleOptionChange = (e) => {
    const selectedOption = e.target.value
    this.setState(() => ({
      selectedOption
    }))
  }

  render() {
    const { redirect404 } = this.props

    if (redirect404) {
      return <Redirect to='/404'/>
    }

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

  if (!questions[id]) {
    return {redirect404: true}
  }

  const authedUserData = users[authedUser];

  const totalVotes = questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length

  const isAnswered = Object.keys(authedUserData.answers).includes(id)

  let question = {
    isAnswered,
    ...questions[id],
    authorInfo: users[questions[id].author]
  }

  if (isAnswered) {
    redirect404: false,
    question = {
      ...question,
      yourVoteA: questions[id].optionOne.votes.includes(authedUserData.id),
      yourVoteB: questions[id].optionTwo.votes.includes(authedUserData.id),
      aPercent: ((questions[id].optionOne.votes.length/totalVotes)*100).toFixed(2),
      bPercent: ((questions[id].optionTwo.votes.length/totalVotes)*100).toFixed(2),
      totalVotes
    }
  }

  return {question, authedUser}
}

export default connect(mapStateToProps)(QuestionPage)