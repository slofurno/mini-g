import lunr from 'lunr'
const index = lunr(function() {
  this.field('tag', { boost: 100 })
  this.field('board', { boost: 20 })
  this.field('title', { boost: 10 })
  this.field('content')
})

import { _fetchCards, _fetchCard, _login, _setToken, _fetchFacts } from 'actions'

function processCard(card) {
  const { id, boards, content, preferredPhrase: title, tags } = card
  const tag = tags.map(({value}) => value).join(' ')
  const board = boards.map(({title}) => title).join(' ')
  return {
    id,
    board,
    tag,
    title,
    content
  }
}

function addEachToLunr(xs) {
  console.log(xs)
  xs.forEach(x => index.add(x))
}

let lookup = {}
let authToken = null
_login()
  .then(({token}) => _setToken(token))
  .then(() => _fetchCards())
  .then(cards => Promise.all(cards.map(_fetchCard)))
  .then(res => {
    res.forEach(x => lookup[x.id] = x)
    return res.map(processCard)
  })
  .then(addEachToLunr)

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "TOGGLE_DISPLAY"});
  });
});

chrome.runtime.onMessage.addListener((message, sender, fn) => {
  let results = index.search(message)
  let ret = results.map(({ref}) => lookup[ref])
  fn(ret)
})

