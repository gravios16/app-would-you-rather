import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

  render () {

    const { authedUser } = this.props

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
            Hello, {authedUser.name}!&nbsp;<img height="10" src="http://localhost:3000/img/avatar.png" alt="User image"/>
          </span>

          <NavLink to='/leaderboard' exact className='navbar-item'>
            Log out
          </NavLink>
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