import typeToReducer from 'type-to-reducer'
import { FETCH_GAMES } from '../actions/gamesActions'

const initalState = {
  loading: false,
  fetched: false,
  games: [],
  error: null
}

export default typeToReducer({
  [FETCH_GAMES]: {
    PENDING: (state) => ({
      ...state,
      loading: true
    }),
    REJECTED: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload
    }),
    FULFILLED: (state, action) => ({
      ...state,
      loading: false,
      fetched: true,
      games: action.payload.filter(game => {
        return game.func_slot & (1<<9)
      })
    })
  }
}, initalState)
