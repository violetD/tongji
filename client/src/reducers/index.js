import { combineReducers } from 'redux'

import userReducer from './userReducer'
import gamesReducer from './gamesReducer'
import gameReducer from './gameReducer'

export default combineReducers({
  user: userReducer,
  games: gamesReducer,
  game: gameReducer,
})
