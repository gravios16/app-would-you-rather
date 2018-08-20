import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  logOut = (history) => {
    const { dispatch, users}  = this.props
    history.push("/")
    dispatch(setAuthedUser(null))
  }

  render () {

    const { authedUser } = this.props
    const LogOutButton = withRouter( ({ history }) => (
      <a onClick={() => this.logOut(history)} className='navbar-item'>
        Log out
      </a>
    ))

    return (
      <div className='navbar' role='navigation' aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to='/' exact className='navbar-item'>
              Home
          </NavLink>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu navbar-start">
          <NavLink to='/new' exact className='navbar-item'>
            New Question
          </NavLink>

          <NavLink to='/leaderboard' exact className='navbar-item'>
            Leader Board
          </NavLink>
        </div>

        { !(authedUser == null) && (<div className="navbar-menu navbar-end">
          <span className='navbar-item'>
            Hi, {authedUser.name}!&nbsp;<img height="10" src={authedUser.avatarURL} alt="User image"/>
          </span>

          <LogOutButton/>
        </div>)}

      </div>
    )
  }
}

function mapStateToProps (props) {
  const { authedUser } = props
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(Nav)