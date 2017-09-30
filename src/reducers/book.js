const { Map } = require('immutable');

const initial_state = {
  connected_book: false,
  bids: Map(),
  asks: Map(),
  fetched: false,
  count: 0
}

const book = (state = initial_state, action) => {
  switch (action.type) {
    case 'CONNECTED_BOOK':
      return {...state, connected_book: true}
    case 'INITIAL_BOOK':
      const bids = action.payload.slice(0,25);
      const asks = action.payload.slice(25);
      var baseMapBids = Map()
      var baseMapAsks = Map()
      for (var i = 0; i < bids.length; i++) {
        const bid_b = bids[i][0];
        const count_b = bids[i][1];
        const amount_b = bids[i][2];
        const bid_a = asks[i][0];
        const count_a = asks[i][1];
        const amount_a = asks[i][2];
        const tempMapBids = {bid: bid_b, count: count_b, amount: amount_b};
        const tempMapAsks = {bid: bid_a, count: count_a, amount: amount_a};
        baseMapBids = baseMapBids.set(bid_b, tempMapBids);
        baseMapAsks = baseMapAsks.set(bid_a, tempMapAsks);
      }
      baseMapBids = baseMapBids.sortBy((item) => -item.bid);
      baseMapAsks = baseMapAsks.sortBy((item) => item.bid);
      return {...state, bids: baseMapBids, asks: baseMapAsks, fetched: true}
    case 'UPDATE_BOOK':
      const price = action.payload[0]
      const count = action.payload[1]
      const amount = action.payload[2]
      if (count > 0) {
        const oldMap = (amount > 0) ? state.bids : state.asks;
        const newMap = oldMap.delete(price)
        const innerMap = {bid: price, count: count, amount: amount};
        const newerMap = newMap.set(price, innerMap)
        const sorted = (amount > 0) ? newerMap.sortBy((item) => -item.bid) : newerMap.sortBy((item) => item.bid);
        return (amount > 0) ? {...state, bids: sorted} : {...state, asks: sorted};
      } else if (count === 0) {
        const oldMap = (amount > 0) ? state.bids : state.asks;
        const newMap = oldMap.delete(price)
        return (amount > 0) ? {...state, bids: newMap} : {...state, asks: newMap};
      }
      break;
    default:
      return state;
  }
}

export default book
