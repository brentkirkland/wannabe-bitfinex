import { connect } from 'react-redux'
import Ticker from '../components/Ticker'

const mapStateToProps = (state) => ({
  ticker: state.ticker
})

const VisibleTicker = connect(
  mapStateToProps
)(Ticker)

export default VisibleTicker
