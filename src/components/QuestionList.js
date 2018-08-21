import React, { Component } from 'react'
import { connect } from 'react-redux'
import TabHeader from './elements/TabHeader'
import Question from './Question'

const tabsData = [
  {
    title: "Unanswered",
    active: true
  },
  {
    title: "Answered",
    active: false
  }
]

class QuestionList extends Component {
  state = {
    tabs: []
  }

  componentDidMount () {
    this.setState(() => ({tabs: tabsData}));
  }

  toggleTab = (tab) => {

    if ( !tab.active ) {
      this.setState( (oldSate) => ({
        tabs: oldSate.tabs.map((oldTab) => (
          { ...oldTab, active: oldTab.title === tab.title }
        ))
      }))
    }
  }

  render() {
    const { tabs } = this.state
    const { questionsIds, users, authedUser } = this.props

    const activeTab = tabs.filter((tab) => (tab.active))[0] || null

    let filteredQuestions = []

    if (activeTab !== null) {
      let answered = activeTab["title"] === 'Answered'
      let answeredQuestionsIds = Object.keys(authedUser.answers)

      filteredQuestions = questionsIds.filter((qId) => {
        let include =  answeredQuestionsIds.includes(qId)
        return answered === true ?  include : !include
      })
    }

    return (
      <section className="section">
        <div className='container'>

          <TabHeader tabs={tabs} onToggleTab={this.toggleTab}/>
          <ul className='dashboard-list'>
            {filteredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
                <br/>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}) {
  return {
    questions,
    users,
    authedUser: users[authedUser],
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionList)