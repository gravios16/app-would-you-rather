import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderUserList extends Component {

  render() {
    return (
      <div>
        Leader Board
      </div>
    )
  }
}

export default connect()(LeaderUserList)