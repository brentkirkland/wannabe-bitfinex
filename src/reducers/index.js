import { combineReducers } from 'redux'
import book from './book'
import trades from './trades'
import ticker from './ticker'
import websocket from './websocket'

const reduced = combineReducers({
  trades,
  book,
  ticker,
  websocket
})

export default reduced
