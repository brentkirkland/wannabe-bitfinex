import React, {Component} from 'react';
import VisibleOrderBook from '../containers/VisibleOrderBook'
import VisibleTrades from '../containers/VisibleTrades'
import VisibleTicker from '../containers/VisibleTicker'
import PropTypes from 'prop-types'
import FPSStats from  '../stats.js'
import './App.css';

class App extends Component {

  componentDidMount() {
    this.connect()
  }

  connect () {
    var msg;
    this.props.websocket.ws.onopen = () => {
      msg = {
        "event": "subscribe",
        "channel": "book",
        "symbol": "tETHBTC",
        "prec": "P3",
        "freq": "F1",
        "len": 25
      }
      this.props.websocket.ws.send(JSON.stringify(msg))

      msg = {
        "event": "subscribe",
        "channel": "trades",
        "symbol": "tETHBTC"
      }
      this.props.websocket.ws.send(JSON.stringify(msg))

      msg = {
        "event": "subscribe",
        "channel": "ticker",
        "symbol": "tETHBTC"
      }

      this.props.websocket.ws.send(JSON.stringify(msg))

    };

    this.props.websocket.ws.onmessage = (e) => {
      // a message was received
      const parsedData = JSON.parse(e.data)

      //TODO: Handle all events better. Figure out meaning of te, tu, hb...

      if (parsedData.event === "info") {

      } else if (parsedData.event === "subscribed" && parsedData.channel === "book") {
        this.props.connectBookToWebsocket()
      } else if (parsedData.event === "subscribed" && parsedData.channel === "trades") {
        this.props.connectTradesToWebsocket()
      } else if (parsedData.event === "subscribed" && parsedData.channel === "ticker") {
        this.props.connectTickerToWebsocket()
      } else if (parsedData[1].length === 10) {
        this.props.updateTicker(parsedData[1])
      } else if (parsedData[1].length === 50) {
        this.props.addInitialBook(parsedData[1])
      } else if (parsedData[1].length === 30) {
        this.props.addInitialTrades(parsedData[1], parsedData[0])
      } else if (this.props.trades.trade_id === parsedData[0] && parsedData.length === 3 && parsedData[2].length === 4) {
        this.props.updateTrade(parsedData[2])
      } else if (parsedData[1].length === 3) {
        this.props.updateBook(parsedData[1])
      }
    };

    this.props.websocket.ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    this.props.websocket.ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }

  handleKill () {
    if (this.props.websocket.dead) {
      this.props.startWebsocket()
      setTimeout(this.connect.bind(this), 500)
    } else {
      this.props.killWebsocket()
    }
  }

  killSwitch () {
    if (this.props.websocket.dead) {
      return (
        <div className="Websocket-switch" onClick={this.handleKill.bind(this)}>
          Connect Websocket
        </div>
      )
    }
    return (
      <div className="Websocket-switch" onClick={this.handleKill.bind(this)}>
        Kill Websocket
      </div>
    )
  }

  renderStats () {
    return (
      <div style={{paddingLeft: '20px', paddingTop: '20px'}}>
        <FPSStats />
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderStats()}
        <header className="App-header">
          <h1 className="App-title">WannaBe Bitfinex</h1>
          {this.killSwitch()}
          <VisibleTicker/>
        </header>
        <div className="App-wide">
          <VisibleOrderBook/>
          <VisibleTrades/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  addInitialBook: PropTypes.func.isRequired,
  connectBookToWebsocket: PropTypes.func.isRequired,
  connectTradesToWebsocket: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  addInitialTrades: PropTypes.func.isRequired,
  updateTrade: PropTypes.func.isRequired,
  connectTickerToWebsocket: PropTypes.func.isRequired,
  updateTicker: PropTypes.func.isRequired,
  killWebsocket: PropTypes.func.isRequired,
  startWebsocket: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  trades: PropTypes.object.isRequired,
  websocket: PropTypes.object.isRequired
}

export default App;
