import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { login } from 'actions'
import rootReducer from 'reducers'
const store = createStore(rootReducer, applyMiddleware(thunk))

import App from './containers/app'
store.dispatch(login())

const rootDiv = document.createElement("div")
const rootId = 'mini-g__root'
rootDiv.id = rootId
document.body.appendChild(rootDiv)
render(<Provider store={store}><App/></Provider>, rootDiv)
