import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'

class Question extends Component {

  render() {
    return <p>Esto es una pregunta</p>
  }
}

export default withRouter(connect()(Question))