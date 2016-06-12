import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchCards } from 'actions'

const appStyle = {
  position: "fixed",
  backgroundColor: "cornflowerblue",
  width: "300px",
  height: "200px",
  top: "10px",
  left: "10px"
}

class App extends Component {
  render() {
    const { fetchCards } = this.props
    return (
      <div style={appStyle}>
        <input type='text'/>
        <input type='button' onClick={() => fetchCards()} value='fetch'/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

export default connect(mapStateToProps, {fetchCards})(App)
