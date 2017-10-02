import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';

class ticker extends Component {

  renderTicker() {
    if (this.props.ticker.fetched) {
      return (
        <div>
          <div>
            <h3>ETHUSD</h3>
          </div>
          <div className="Ticker-stat">
            <span>Bid</span>
            <span>{this.props.ticker.bid}</span>
          </div>
          <div  className="Ticker-stat">
            <span>Volume</span>
            <span>{this.props.ticker.vol.toFixed(2)}</span>
          </div>
          <div  className="Ticker-stat">
            <span>24hr Change</span>
            <span>{this.props.ticker.change}</span>
            <span>{this.props.ticker.change_percent.toFixed(2) + ' %'}</span>
          </div>
          <div  className="Ticker-stat">
            <span>High</span>
            <span>{this.props.ticker.high}</span>
          </div>
          <div  className="Ticker-stat">
            <span>Low</span>
            <span>{this.props.ticker.low}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <span>Getting ticker</span>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderTicker()}
      </div>
    );
  }
}

ticker.propTypes = {
  ticker: PropTypes.object.isRequired
}

export default ticker;
