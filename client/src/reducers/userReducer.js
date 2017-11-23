import typeToReducer from 'type-to-reducer'
import { USER_LOGIN, USER_LOGOUT } from '../actions/userActions'

const initalState = {
  loading: false,
  isFetched: false,
  hasAuthed: false,
  username: null,
  error: null,
}

export default typeToReducer({
  [USER_LOGIN]: {
    PENDING: (state) => ({
      ...state,
      isFetched: false,
      loading: true
    }),
    REJECTED: (state, action) => ({
      ...state,
      loading: false,
      isFetched: true,
      hasAuthed: false,
      error: action.payload,
    }),
    FULFILLED: (state, action) => ({
      ...state,
      loading: false,
      hasAuthed: true,
      isFetched: true,
      username: action.payload,
    })
  },
  [USER_LOGOUT]: {
    PENDING: (state) => ({
      ...state,
      isFetched: false,
      loading: true,
    }),
    REJECTED: (state, action) => ({
      ...state,
      isFetched: true,
      loading: false,
      hasAuthed: false,
      error: action.payload
    }),
    FULFILLED: (state) => ({
      ...state,
      isFetched: true,
      loading: false,
      hasAuthed: false,
      username: null
    })
  },
}, initalState)
