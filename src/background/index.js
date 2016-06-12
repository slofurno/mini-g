import { _fetchCards, _login, _setToken } from 'actions'

let facts = []
let authToken = null
_login()
  .then(({token}) => _setToken(token))
  .then(() => _fetchCards())
  .then(res => facts = facts.concat(res))

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "TOGGLE_DISPLAY"});
  });
});

chrome.runtime.onMessage.addListener((message, sender, fn) => {
  console.log(message, sender, fn)
  fn(facts)
})

