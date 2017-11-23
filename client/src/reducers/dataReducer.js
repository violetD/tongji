import typeToReducer from 'type-to-reducer';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { FETCH_DATA } from '../actions'

const initalState = {
  loading: false,
  fetched: false,
  games: [],
  error: null
}

export default gameReducer = typeToReducer({
  [FETCH_GAME]: {
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
      games: action.payload.data
    })
  }
}, initalState)

