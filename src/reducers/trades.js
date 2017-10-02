// use collections to get performance of a Queue
const Deque = require('collections/deque')

const initial_state = {
  connected_trades: false,
  trades: null,
  trade_ids: null,
  trade_id: null
}

const trades = (state = initial_state, action) => {
  var idQ = Deque();
  switch (action.type) {
    case 'CONNECTED_TRADES':
      return {...state, connected_trades: true}
    case 'INITIAL_TRADES':
      // need to create an id queue as collections
      // can't check if collection has array
      for (var i = 0; i < action.payload.length; i++) {
        idQ.push(action.payload[i][0])
      }
      return {...state, trades: new Deque(action.payload), trade_ids: idQ, trade_id: action.id}
    case 'UPDATE_TRADE':
      idQ = state.trade_ids;
      var trades = state.trades;
      if (!idQ.has(action.payload[0])) {
        trades.pop();
        trades.unshift(action.payload)
        idQ.unshift(action.payload[0])
      }
      return {...state, trades: trades, trade_ids: idQ}
    default:
      return state;
  }
}

export default trades
