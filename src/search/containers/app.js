import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { searchFacts } from 'actions'
require('./app.css')

const appStyle = {
  position: "fixed",
  backgroundColor: 'rgba(0,0,0,0.2)',
  width: "600px",
  height: "40px",
  bottom: "10px",
  left: "10px"
}

class Search extends Component {
  componentDidMount() {
    findDOMNode(this.refs.search).focus()
  }

  render() {
    const { searchFacts, display } = this.props
    return (
      <div className='mini__app'>
        <input type='text' ref='search'/>
        <input type='button' onClick={() => searchFacts(this.refs.search.value)} value='fetch'/>
      </div>
    )
  }
}

const factStyle = {
  display: 'flex',
  flex: '0 1 auto',
  width: '590px',
  height: '80px',
  marginBottom: '10px',
  padding: '5px 10px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(152, 85, 194, 0.1)',
  borderLeft: '3px solid #6a1f99',
  //backgroundColor: 'rgba(0,0,0,0.2)',
}

class Fact extends Component {
  render() {
    const { fact } = this.props

    return (
      <div className='mini__fact'>
        <ul className='mini__fact-list'>
          <li> { fact.id } </li>
          <li> { fact.preferredPhrase } </li>
          <li> { fact.content } </li>
        </ul>
      </div>
    )
  }
}

const listStyle = {
  position: 'fixed',
  bottom: '60px',
  left: '10px',
  width: '600px',
  //backgroundColor: '#462f52',
  //backgroundColor: 'rgba(0,0,0,0.8)',
  //background: 'radial-gradient(71% 100%,#00ebad 0,#0c9 100%)',
  display: 'flex',
  flexWrap: 'wrap',
}

class FactsList extends Component {
  render() {
    const { facts } = this.props

    return (
      <div className='mini__content-container'>
        { facts.length >= 1
            ? facts.map(x => <Fact key={x.id} fact={x}/>)
            : <div> no results </div>
        }
      </div>
    )
  }
}

class App extends Component {
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { searchFacts, display, facts } = this.props

    return (
      display
      ? (
          <div>
            <Search searchFacts={searchFacts}/>
            <FactsList facts={facts}/>
          </div>
        )
      : null
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

export default connect(mapStateToProps, {searchFacts})(App)
