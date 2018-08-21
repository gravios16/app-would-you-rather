import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  createQuestion = (e) => {
    e.preventDefault()
    const { authedUser } = this.props
    const {optionOne, optionTwo} = this.state

    this.props.dispatch(handleAddQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      userId: authedUser.id
    }))

    this.setState(() => ({toHome: true}))
  }

  handleChange = (option, value) => {

    let newState = {}

    switch(option) {
      case "optionOne":
        newState = {optionOne: value}
        break
      case "optionTwo":
        newState = {optionTwo: value}
        break
      default:
        break
    }

    this.setState((oldState) => ({
      ...oldState,
      ...newState
    }))
  }

  render() {
    const { toHome } = this.state
    const {authedUser} = this.props

    if (toHome === true) {
      return <Redirect to='/'/>
    }

    return (
      <section className="section">
        <div className='container'>
          <div className="box">
            <article className="media question-container">
              <div className="media-left">
                <figure className="image is-96x96 is-1by1">
                  <img src={authedUser.avatarURL} alt="Image"/>
                </figure>
              </div>

              <div className="media-content">
                <div className="content">
                    <strong>Create New Question</strong>
                    <hr className="question-divider"/>
                    <small>Complete the question:</small>
                    <br/><br/>
                    <div className="question-info">
                      <strong>Would you rather...</strong>
                      <div className="field">
                        <div className="control">
                          <input className="input is-info" type="text" placeholder="Option One"
                            value={this.state.optionOne}
                            onChange={(e) => this.handleChange('optionOne', e.target.value)}
                          />
                        </div>
                      </div>
                      <strong>Or</strong>
                      <div className="field">
                        <div className="control">
                          <input className="input is-info" type="text" placeholder="Option Two"
                            value={this.state.optionTwo}
                            onChange={(e) => this.handleChange('optionTwo', e.target.value)}
                          />
                        </div>
                      </div>
                      <hr className="question-divider"/>
                      <a className="button is-success"
                        onClick={this.createQuestion}
                      >Submit</a>
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

function mapStateToProps ({users, authedUser}) {
  return {
    authedUser: users[authedUser],
  }
}

export default connect(mapStateToProps)(NewQuestion)