import React from "react"
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function  PrivateRoute ({ component: Component, authedUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authedUser !== null ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(PrivateRoute)