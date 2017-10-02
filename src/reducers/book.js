const SortedArrayMap = require('collections/sorted-array-map')

const initial_state = {
  connected_book: false,
  bids: null,
  asks: null,
  fetched: false,
  count: 0,
  total_a: 0,
  total_b: 0
}

const book = (state = initial_state, action) => {
  switch (action.type) {
    case 'CONNECTED_BOOK':
      return { ...state,
        connected_book: true
      }
    case 'INITIAL_BOOK':
      const bids = action.payload.slice(0, 25);
      const asks = action.payload.slice(25);
      var obj_a = {};
      var obj_b = {};
      var total_a = 0;
      var total_b = 0;
      for (var i = 0; i < bids.length; i++) {
        const bid_b = bids[i][0];
        const bid_a = asks[i][0];
        obj_b[JSON.stringify(bid_b)] = bids[i];
        obj_a[JSON.stringify(bid_a)] = asks[i];
        total_a += asks[i][2]
        total_b += bids[i][2]
      }
      const sama = SortedArrayMap(obj_a, null, function(a, b) {
        return a - b
      })
      const samb = SortedArrayMap(obj_b, null, function(a, b) {
        return b - a
      })
      return { ...state,
        bids: samb,
        asks: sama,
        fetched: true,
        total_a: total_a,
        total_b: total_b
      }
    case 'UPDATE_BOOK':
      var map;
      var total;
      const price = action.payload[0]
      const count = action.payload[1]
      const amount = action.payload[2]
      if (count > 0) {
        var stringify = JSON.stringify(price)
        var oldTotal;
        map = (amount > 0) ? state.bids : state.asks;
        if (map.get(stringify) !== undefined) {
          oldTotal = map.get(stringify)[2];
        } else {
          oldTotal = 0;
        }
        map.delete(stringify)
        map.set(stringify, action.payload)
        total = (amount > 0) ? state.total_b : state.total_a;
        total -= oldTotal;
        total += amount;
        return (amount > 0) ? { ...state,
          bids: map,
          total_b: total
        } : { ...state,
          asks: map,
          total_a: total
        };
      } else if (count === 0) {
        map = (amount > 0) ? state.bids : state.asks;
        map.delete(JSON.stringify(price))
        total = (amount > 0) ? state.total_b : state.total_a;
        total -= amount;
        return (amount > 0) ? { ...state,
          bids: map,
          total_b: total
        } : { ...state,
          asks: map,
          total_a: total
        };
      }
      break;
    default:
      return state;
  }
}

export default book
