export const addInitialBook = (arr) => ({
  type: 'INITIAL_BOOK',
  payload: arr
})

export const addInitialTrades = (arr, id) => ({
  type: 'INITIAL_TRADES',
  payload: arr,
  id: id
})

export const updateBook = (arr) => ({
  type: 'UPDATE_BOOK',
  payload: arr
})

export const updateTrade = (arr) => ({
  type: 'UPDATE_TRADE',
  payload: arr
})

export const updateTicker = (arr) => ({
  type: 'UPDATE_TICKER',
  payload: arr
})

export const connectBookToWebsocket = () => ({
  type: 'CONNECTED_BOOK'
})

export const connectTradesToWebsocket = () => ({
  type: 'CONNECTED_TRADES'
})

export const connectTickerToWebsocket = () => ({
  type: 'CONNECTED_TICKER'
})

export const killWebsocket = () => ({
  type: 'KILL_WEBSOCKET'
})

export const startWebsocket = () => ({
  type: 'START_WEBSOCKET'
})
