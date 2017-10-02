import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';

class OrderBook extends Component {

  renderBids(boo) {
    var total;
    var absoluteTotalA = this.props.book.total_a;
    var absoluteTotalB = this.props.book.total_b;
    var absoluteTotal = absoluteTotalB - absoluteTotalA;
    if (boo) {
      total = 0;
      return this.props.book.bids.map(function(value) {
        total += value[2]
        var ratio = (total / absoluteTotal * 100).toFixed(0)
        var background_str = 'linear-gradient(to left, #354430 ' + ( ratio) + '%, #222 ' + 0 + '%)'
        return (
          <div key={JSON.stringify(value[0]) + 'b' + JSON.stringify(value[2])} className="OrderBook-green"
            style={{background: background_str}}>
            <span>{value[1].toFixed(2)}</span>
            <span>{value[2].toFixed(8)}</span>
            <span>{total.toFixed(2)}</span>
            <span>{value[0].toFixed(4)}</span>
          </div>
        )
      })
    } else {
      total = 0;
      return this.props.book.asks.map(function(value) {
        total += -1*value[2]
        var ratio = (total / absoluteTotal * 100).toFixed(0)
        var background_str = 'linear-gradient(to left, #222 ' + (100 - ratio) + '%, #472c2c ' + 0 + '%)'
        return (
          <div key={JSON.stringify(value[0]) + 'a' + JSON.stringify(value[2])} className="OrderBook-red"
            style={{background: background_str}}>
            <span>{value[1].toFixed(2)}</span>
            <span>{(value[2] * -1).toFixed(8)}</span>
            <span>{total.toFixed(2)}</span>
            <span>{value[0].toFixed(4)}</span>
          </div>
        )
      })
    }
  }

  handleFetch() {
    if (!this.props.book.fetched) {
      return (
        <div className="OrderBook">
          <p>Fetching order book...</p>
        </div>
      )
    } else {
      return (
        <div className="OrderBook">
          <div className="OrderBook-panel">
            <div className="OrderBook-wide">
              <span>{"Count"}</span>
              <span>{"Amount"}</span>
              <span>{"Total"}</span>
              <span>{"Price"}</span>
            </div>
            {this.renderBids(true)}
          </div>
          <div className="OrderBook-panel">
            <div className="OrderBook-wide">
              <span>{"Count"}</span>
              <span>{"Amount"}</span>
              <span>{"Total"}</span>
              <span>{"Price"}</span>
            </div>
            {this.renderBids(false)}
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="OrderBook-main">
        <h3>Order Book</h3>
        {this.handleFetch()}
      </div>
    );
  }
}

OrderBook.propTypes = {
  book: PropTypes.object.isRequired
}

export default OrderBook;
