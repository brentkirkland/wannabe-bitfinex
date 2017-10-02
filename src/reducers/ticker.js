const initial_state = {
  connected_ticker: false,
  vol: null,
  low: null,
  high: null,
  bid: null,
  change: null,
  change_percent:null,
  fetched: false
}

const ticker = (state = initial_state, action) => {
  switch (action.type) {
    case 'CONNECTED_TICKER':
      return {...state, connected_ticker: true}
    case 'UPDATE_TICKER':
      return {
        ...state,
        low: action.payload[9],
        high: action.payload[8],
        vol: action.payload[7],
        change: action.payload[4],
        change_percent: action.payload[5] * 100,
        bid: action.payload[6],
        fetched: true
      }
    default:
      return state;
  }
}

export default ticker
