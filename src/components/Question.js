import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'

class Question extends Component {



  render() {

    const {question} = this.props
    console.log(question)

    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={question.authorInfo.avatarURL} alt="Image"/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{question.authorInfo.name}</strong> <small>@johnsmith</small> <small>31m</small>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item" aria-label="reply">
                  <span className="icon is-small">
                    <i className="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <a className="level-item" aria-label="retweet">
                  <span className="icon is-small">
                    <i className="fas fa-retweet" aria-hidden="true"></i>
                  </span>
                </a>
                <a className="level-item" aria-label="like">
                  <span className="icon is-small">
                    <i className="fas fa-heart" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}

function mapStateToProps ({users ,questions}, { id }) {
  return {
    question: {
      ...questions[id],
      authorInfo: users[questions[id].author]
    }
  }
}

export default withRouter(connect(mapStateToProps)(Question))