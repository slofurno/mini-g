import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { searchFacts } from 'actions'

const appStyle = {
  position: "fixed",
  backgroundColor: "cornflowerblue",
  width: "300px",
  height: "200px",
  top: "10px",
  left: "10px"
}

class Search extends Component {
  componentDidMount() {
    findDOMNode(this.refs.search).focus()
  }

  render() {
    const { searchFacts, display } = this.props
    return (
      <div style={appStyle}>
        <input type='text' ref='search'/>
        <input type='button' onClick={() => searchFacts(this.refs.search.value)} value='fetch'/>
      </div>
    )
  }
}

class App extends Component {
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { searchFacts, display } = this.props

    return display
    ? <Search searchFacts={searchFacts}/>
    : null
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

export default connect(mapStateToProps, {searchFacts})(App)
