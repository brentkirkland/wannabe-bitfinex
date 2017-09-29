const { Map } = require('immutable');

const initial_state = {
  connected_trades: false,
  trades: Map(),
  trades_arr: [],
  trade_id: null
}

const trades = (state = initial_state, action) => {
  switch (action.type) {
    case 'CONNECTED_TRADES':
      return {...state, connected_trades: true}
    case 'INITIAL_TRADES':
      console.log("trades", action.payload)
      var baseMap = Map();
      for (var i = 0; i < action.payload.length; i++) {
        const time = action.payload[i][1];
        const amount = action.payload[i][2];
        const price = action.payload[i][3];
        const obj = {time: time, price: price, amount: amount};
        baseMap = baseMap.set(time, obj)
      }
      baseMap = baseMap.sortBy((item) => -item.time);
      return {...state, trades: baseMap, trade_id: action.id}
    case 'UPDATE_TRADE':
      const o = {time: action.payload[1],
        amount: action.payload[2],
        price: action.payload[3]
      }
      const newMap = state.trades.set(action.payload[1], o)
      // tarr.pop();
      return {...state, trades: newMap.sortBy((item) => -item.time)}
    default:
      return state;
  }
}

export default trades
