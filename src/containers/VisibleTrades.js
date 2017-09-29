import { connect } from 'react-redux'
import Trades from '../components/Trades'

const mapStateToProps = (state) => ({
  trades: state.trades
})

const VisibleTrades = connect(
  mapStateToProps
)(Trades)

export default VisibleTrades
