import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderUser from './LeaderUser'

class LeaderUserList extends Component {

  render() {
    const { users } = this.props

    return (
      <section className="section">
        <div className='container'>
          <ul className='dashboard-list'>
            {users.map((userId) => (
              <li key={userId}>
                <LeaderUser id={userId} />
                <br/>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    users: Object.keys(users)
      .sort((a,b) => calcScore(users[b]) - calcScore(users[a]))
  }
}

function calcScore(user) {
  return Object.keys(user.answers).length + Object.keys(user.questions).length
}

export default connect(mapStateToProps)(LeaderUserList)