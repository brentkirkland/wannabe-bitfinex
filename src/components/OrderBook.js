import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';

class OrderBook extends Component {

  renderBids(boo) {
    // eslint-disable-next-line
    var obj;
    var some = {};
    if (boo) {
      obj = {
        total: 0,
        count: 0
      }
      return this.props.book.bids.entrySeq().map(function(value) {
        // I am well aware how hacky this is
        // Immutable.js like to render this 3 times!! crazy
        // would not recommend immutable headaches
        obj.count += 1;
        if (some[value[0]]=== undefined && obj.count > 50) {
          some[value[0]] = 1;
          obj.total += value[1].amount
        }

        // react is telling me that it is rendering two children
        //
        return (
          <div key={value[0] + value[1]} className="OrderBook-green">
            <span>{value[1].count.toFixed(2)}</span>
            <span>{value[1].amount.toFixed(8)}</span>
            <span>{obj.total.toFixed(2)}</span>
            <span>{value[0].toFixed(2)}</span>
          </div>
        )
      })
    } else {
      obj = {
        total: 0,
        count: 0
      }
      return this.props.book.asks.entrySeq().map(function(value) {
        obj.count += 1;
        if (some[value[0]]=== undefined && obj.count > 50) {
          some[value[0]] = 1;
          obj.total += -1*value[1].amount
        }
        return (
          <div key={value[0] + value[1]} className="OrderBook-red">
            <span>{value[1].count.toFixed(2)}</span>
            <span>{(value[1].amount * -1).toFixed(8)}</span>
            <span key={obj.total}>{obj.total.toFixed(2)}</span>
            <span>{value[0].toFixed(2)}</span>
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
