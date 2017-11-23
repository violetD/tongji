import axios from 'axios'

import { requestUrl } from './config.json'

export const FETCH_GAMES = 'FETCH_GAMES'

export function fetchGames() {
  return {
    type: FETCH_GAMES,
    payload: axios.get(requestUrl + '?r=common/game/getGameList')
  }
}
