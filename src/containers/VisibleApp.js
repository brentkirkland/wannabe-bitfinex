import {
  connect
} from 'react-redux'
import {
  addInitialBook,
  updateBook,
  connectBookToWebsocket,
  connectTradesToWebsocket,
  addInitialTrades,
  updateTrade,
  connectTickerToWebsocket,
  updateTicker,
  killWebsocket,
  startWebsocket
} from '../actions'
import App from '../components/App'

const mapStateToProps = (state) => ({
  book: state.book,
  trades: state.trades,
  websocket: state.websocket
})

const mapDispatchToProps = {
  addInitialBook: addInitialBook,
  connectBookToWebsocket: connectBookToWebsocket,
  connectTradesToWebsocket: connectTradesToWebsocket,
  updateBook: updateBook,
  addInitialTrades: addInitialTrades,
  updateTrade: updateTrade,
  connectTickerToWebsocket: connectTickerToWebsocket,
  updateTicker: updateTicker,
  killWebsocket: killWebsocket,
  startWebsocket: startWebsocket
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default VisibleApp
