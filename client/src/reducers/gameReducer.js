import typeToReducer from 'type-to-reducer';
import { FETCH_GAME } from '../actions/gameActions'

const initalState = {
  loading: false,
  fetched: false,
  gpzs: [],
  error: null,
  gameId: null,
  gpzsId: null
}

export default typeToReducer({
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
      gpzs: action.payload
    })
  },
}, initalState)
