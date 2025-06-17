/* global atom */

const path = require('path')
const { AutoLanguageClient } = require('atom-languageclient')
const { registerHelpCommands } = require('./helpCmd')

class CSSLanguageClient extends AutoLanguageClient {
  constructor() {
    super()
    registerHelpCommands()
  }
  getGrammarScopes () {
    return [
      'source.css',
      'source.css.less',
      'source.css.scss',
    ]
  }
  getLanguageName () { return 'CSS/LESS/SCSS' }
  getServerName () { return 'VSCODE-CSS-LANG-SERVER' }
  getConnectionType() { return 'stdio' }

  startServerProcess () {
    return super.spawn(path.resolve(path.join(
      __dirname,
      '../node_modules/.bin/vscode-css-language-server'
    )), ['--stdio'])
  }

  preInitialization (connection) {
    connection.onCustom('$/partialResult', () => {}) // Suppress partialResult until the language server honours 'streaming' detection
  }
}

module.exports = new CSSLanguageClient()
