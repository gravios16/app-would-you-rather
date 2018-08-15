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
          oldTab.title === tab.title ? { title: oldTab.title, active: !oldTab.active } : { title: oldTab.title, active: false }
        ))
      }))
    }
  }

  render() {
    //console.log(this.props,"props")

    const { tabs } = this.state
    const { questionsIds } = this.props

    const activeTab = tabs.filter((tab) => (tab.active))[0]

    const filteredQuestions = questionsIds.filter((q) => {

    })

    return (
      <div>

        <TabHeader tabs={tabs} onToggleTab={this.toggleTab}/>
        <ul className='dashboard-list'>
          {questionsIds.map((id) => (
            <li key={id}>
              <Question id={id} />
              <br/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionList)