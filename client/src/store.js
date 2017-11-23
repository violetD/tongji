import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from './reducers'

const reformPromise = store => next => action => {
  if (!action.payload) {
    return next(action)
  }

  const actionTypePos = action.type.lastIndexOf('_')
  const promiseType = action.type.substr(actionTypePos)
  const actionType = action.type.substr(0, actionTypePos)

  if (promiseType === '_FULFILLED') {
    if (action.payload.data) {
      if (action.payload.data.result !== 0) {
        let newAction = {
          ...action,
          payload: action.payload.data.err_desc,
          type: actionType + '_REJECTED'
        }
        return next(newAction)
      } else {
        let newAction = {
          ...action,
          payload: action.payload.data.data,
        }
        return next(newAction)
      }
    }
  }

  return next(action)
}

const middleware = applyMiddleware(promise(), reformPromise, thunk, logger)

export default createStore(reducers, middleware)
