import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';

class OrderBook extends Component {

  renderPoint(value) {
    return (
      <div key={value[0]}>
        <span>{value[0]}</span>
        <span>{value[1].count}</span>
        <span>{value[1].amount.toFixed(8)}</span>
      </div>
    )
  }

  renderBids(boo) {
    // eslint-disable-next-line
    var total = 0;
    if (boo) {
      return this.props.book.bids.entrySeq().map(function(value) {
        total += value[1].count
        return (
          <div key={value[0]} className="OrderBook-green">
            <span>{value[1].count.toFixed(2)}</span>
            <span>{value[1].amount.toFixed(8)}</span>
            <span>{value[1].count.toFixed(2)}</span>
            <span>{value[0].toFixed(8)}</span>
          </div>
        )
      })
    }
    return this.props.book.asks.entrySeq().map(function(value) {
      total += value[1].count
      return (
        <div key={value[0]} className="OrderBook-red">
          <span>{value[1].count.toFixed(2)}</span>
          <span>{(value[1].amount * -1).toFixed(8)}</span>
          <span>{value[1].count.toFixed(2)}</span>
          <span>{value[0].toFixed(8)}</span>
        </div>
      )
    })
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
