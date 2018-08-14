import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (

    <nav className='navbar' role='navigation' aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to='/' exact className='navbar-item'>
            Home
        </NavLink>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
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

      <div className="navbar-menu navbar-end">
        <span className='navbar-item'>
          Hello, Massimo!&nbsp;<img height="10" src="http://localhost:3000/img/avatar.png" />
        </span>

        <NavLink to='/leaderboard' exact className='navbar-item'>
          Log out
        </NavLink>
      </div>

    </nav>
  )
}