import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import LoadingBar from 'react-redux-loading'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion'
import LeaderUserList from './LeaderUserList'
import QuestionPage from './QuestionPage'
import LogIn from './LogIn'
import NotFound404 from './NotFound404'
import PrivateRoute from './elements/PrivateRoute'
import Nav from './Nav'

import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
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
                <PrivateRoute path='/' exact component={QuestionList} />
                <PrivateRoute path='/add' exact component={NewQuestion} />
                <PrivateRoute path='/leaderboard' exact component={LeaderUserList} />
                <PrivateRoute path='/question/:id' exact component={QuestionPage} />
                <Route path='/login' exact component={LogIn} />
                <PrivateRoute path='/404' exact component={NotFound404} />
                <PrivateRoute component={NotFound404} />
              </Switch>
            </Fragment>
          )}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    loading: !(Object.keys(questions).length > 0)
  }
}

export default connect(mapStateToProps)(App)