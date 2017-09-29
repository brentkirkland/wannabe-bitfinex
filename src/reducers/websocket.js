const initial_state = {
  ws: new WebSocket("wss://api.bitfinex.com/ws/2"),
  dead: false
}

const websocket = (state = initial_state, action) => {
  switch (action.type) {
    case 'START_WEBSOCKET':
      return {...state, ws: new WebSocket("wss://api.bitfinex.com/ws/2"), dead: false}
    case 'KILL_WEBSOCKET':
      state.ws.close()
      return {...state, ws: null, dead: true}
    default:
      return state;
  }
}

export default websocket
