import axios from 'axios'

import { requestUrl } from './config.json'

export const FETCH_GAME = 'FETCH_GAME'

function fetchPlatform(id) {
  return axios.get(requestUrl + '?r=common/gpzs/getPlatform&game_id=' + id)
}

function fetchZoneServer(id) {
  return axios.get(requestUrl + '?r=common/gpzs/getZoneServerAll&game_id=' + id)
}

function fetchGamePending() {
  return {
    type: 'FETCH_GAME_PENDING',
  }
}

export function fetchGame(id) {
  return function (dispatch) {
    dispatch(fetchGamePending())
    axios.all([fetchPlatform(id), fetchZoneServer(id)])
      .then((response) => {
        if (response[0].data.result !== 0 || response[1].data.result !== 0) {
          dispatch({ type: 'FETCH_GAME_REJECTED', payload: '加载出错' })
        } else {
          dispatch({ 
            type: 'FETCH_GAME_FULFILLED', 
            payload: {
              platform: response[0].data.data,
              gpzs: response[0].data.data.concat(response[1].data.data)
            }
          })
        }
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_GAME_REJECTED', payload: err })
      })
  }
}
