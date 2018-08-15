import React from 'react'

function TabHeader(props) {

  const  { tabs, onToggleTab } = props

  return (
    <div className="tabs is-toggle is-fullwidth">
      <ul>
        {tabs.map((tab) => (

          <li key={tab.title} className={tab.active ? "is-active" : ""}>
            <a onClick={() => onToggleTab(tab) }>
              <span className="icon"><i className="fas fa-image" aria-hidden="true"></i></span>
              <span>{tab.title}</span>
            </a>
          </li>

        ))}

      </ul>
    </div>
  )
}

export default TabHeader