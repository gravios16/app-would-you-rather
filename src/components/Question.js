import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Question extends Component {

  render() {

    const {question} = this.props

    return (
      <NavLink to={'/question/' + question.id} exact className="question-box">
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
                    <p>
                      <strong>Would you rather?</strong>
                      <br/>
                      <small>{question.optionOne.text}</small><br/>
                      <strong>Or</strong><br/>
                      <small>{question.optionTwo.text}</small>
                    </p>
                  </div>

              </div>
            </div>
          </article>
        </div>
      </NavLink>
    )
  }
}

function mapStateToProps ({users, questions}, { id }) {
  return {
    question: {
      ...questions[id],
      authorInfo: users[questions[id].author]
    }
  }
}

export default connect(mapStateToProps)(Question)