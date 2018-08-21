import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {

  state = {
    selectedUser: ''
  }

  handleChangue = (e) => {
    const userId = e.target.value

    this.setState(() => ({
      selectedUser: userId
    }))
  }

  logIn = (e) => {
    e.preventDefault()

    const { selectedUser } = this.state
    const { dispatch }  = this.props

    if (selectedUser !== '') {
      dispatch(setAuthedUser(selectedUser))
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { users, authedUser }  = this.props
    const { selectedUser, toHome } = this.state

    if ( !(authedUser === null) ) {
      return <Redirect to={from} />
    }

    return (
      <section className="section">
        <div className='container'>

          <div className="card">
            <header className="card-header">
              <p className="card-header-title is-centered">
                Welcome to the Would you rather App!
              </p>
            </header>

            <div className="card-content">
              <div className="content has-text-centered">
                <p>Please Sign In to continue...</p>

                <figure>
                  <img src="http://localhost:3000/img/react.png" width="150"/>
                </figure>

                <h6>Sign In</h6>

                <div className="field">
                  <div className="control has-text-centered">
                    <div className="select is-info">
                      <select onChange={this.handleChangue} value={selectedUser}>
                        <option value="">Select user</option>
                        {Object.values(users).map((user) => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item" onClick={this.logIn}>Sign In</a>
            </footer>
          </div>

        </div>
      </section>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(LogIn)