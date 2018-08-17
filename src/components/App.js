import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import LoadingBar from 'react-redux-loading'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion'
import LeaderUserList from './LeaderUserList'
import LogIn from './LogIn'
import NotFound404 from './NotFound404'
import Nav from './Nav'

import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  middleware (component) {
    const { authedUser } = this.props
    return authedUser === null ? LogIn : component
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <LoadingBar />
          {this.props.loading === false && (
            <Fragment>
              <Switch>
                <Route path='/' exact component={this.middleware(QuestionList)} />
                <Route path='/new' exact component={this.middleware(NewQuestion)} />
                <Route path='/leaderboard' exact component={this.middleware(LeaderUserList)} />
                <Route path='/login' exact component={LogIn} />
                <Route component={NotFound404} />
              </Switch>
            </Fragment>
          )}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {
  return {
    loading: !(Object.keys(questions).length > 0),
    authedUser
  }
}

export default connect(mapStateToProps)(App)