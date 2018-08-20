import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderUser extends Component {

  render() {
    const {user} = this.props
    return (
      <section className="section">
        <div className='container'>
          <div className="box">
            <article className="media question-container">
              <div className="media-left">
                <figure className="image is-96x96 is-1by1">
                  <img src={user.avatarURL} alt="Image"/>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                    <strong>{user.name}:</strong>
                    <hr className="question-divider"/>
                    <div className="question-info">
                      <p>Answered questions <strong>{Object.keys(user.answers).length}</strong></p>
                      <hr className="question-divider"/>
                      <p>Created questions <strong>{Object.keys(user.questions).length}</strong></p>
                      <hr className="question-divider"/>
                    </div>
                </div>
              </div>
              <div className="media-right">
                <div className="score-box">
                  <span className="score">Score</span>
                  <span className="score-number">{Object.keys(user.answers).length + Object.keys(user.questions).length}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps ({users}, { id }) {
  return {
    user: users[id]
  }
}

export default connect(mapStateToProps)(LeaderUser)