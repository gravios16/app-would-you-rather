import React, { Component } from 'react'
import { connect } from 'react-redux'

class LogIn extends Component {

  render() {
    return (
      <div>
        Login view
      </div>
    )
  }
}

export default connect()(LogIn)