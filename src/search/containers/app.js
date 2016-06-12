import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { searchFacts, maybeSelectFact, unselectFact } from 'actions'
require('./app.css')

class Search extends Component {
  componentDidMount() {
    findDOMNode(this.refs.search).focus()
  }

  render() {
    const { searchFacts, display } = this.props
    return (
      <div className='mini__app'>
        <input className='mini__input' type='text' ref='search' onKeyDown={ e => console.log({...e}) } onChange={(e) => searchFacts(e.target.value)}/>
      </div>
    )
  }
}

class Fact extends Component {
  render() {
    const { fact: { id, preferredPhrase, content, tags, boards } } = this.props

    return (
      <div className='mini__fact'>
        <div className='mini__fact-tag-container'>
          <ul className='mini__fact-list'>
            <li> { preferredPhrase } </li>
            <li> { content } </li>
          </ul>
        </div>

        <div className='mini__fact-tag-container'>
          { boards.map(({title}, i) =>
              <span className='mini__fact-board' key={i}>{ title }</span>) }

          { tags.map(({value}, i) =>
              <span className='mini__fact-tag' key={i}>{ value }</span>) }
        </div>
      </div>
    )
  }
}

class FactsList extends Component {
  render() {
    const { facts } = this.props

    return (
      <div className='mini__results-container'>
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
    const { searchFacts, maybeSelectFact, unselectFact, display, facts } = this.props

    return (
      display
      ? (
          <div style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            width: 620,
            backgroundColor: 'rgba(0,0,0,0.25)'
          }}>
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

export default connect(mapStateToProps, {searchFacts, maybeSelectFact, unselectFact})(App)
