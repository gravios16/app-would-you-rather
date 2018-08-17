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
    //console.log(this.props,"props")

    const { tabs } = this.state
    const { questionsIds, users, authedUser } = this.props

    const activeTab = tabs.filter((tab) => (tab.active))[0]
    const userInfo = users[authedUser]

    console.log(userInfo, "zzzzzzzzzzzzzz");

    const filteredQuestions = questionsIds.filter((q) => {

    })

    return (
      <section className="section">
        <div className='container'>

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
      </section>
    )
  }
}

function mapStateToProps (props) {

  const {questions} = props

  return {
    ...props,
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionList)