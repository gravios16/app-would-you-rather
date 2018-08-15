import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewQuestion extends Component {
  state = {
    opcion1: '',
    opcion2: '',
    toHome: false
  }

  render() {
    return (
      <div>
        Nueva pregunta.
      </div>
    )
  }
}

export default connect()(NewQuestion)