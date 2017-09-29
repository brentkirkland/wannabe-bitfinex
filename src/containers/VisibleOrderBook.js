import {
  connect
} from 'react-redux'

import OrderBook from '../components/OrderBook'

const mapStateToProps = (state) => ({
  book: state.book
})

const VisibleOrderBook = connect(
  mapStateToProps
)(OrderBook)

export default VisibleOrderBook
