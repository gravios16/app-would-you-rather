import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import LoadingBar from 'react-redux-loading'
import QuestionList from './QuestionList'
//import NewQuestion from './NewQuestion'
//import LeaderUserList from './LeaderUserList'
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
          <LoadingBar />
          <div className='container'>

            <Nav />
            {this.props.loading === false &&
              <div>
                <Route path='/' exact component={QuestionList} />
                {/*<Route path='/new' exact component={NewQuestion} />*/}
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)