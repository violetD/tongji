import axios from 'axios'

import { requestUrl } from './config.json'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export function logout() {
  return {
    type: USER_LOGOUT,
    payload: axios.get(requestUrl + '?r=user/logout')
  }
}

export function login(username, pwd) {
  return {
    type: USER_LOGIN,
    payload: axios.post(requestUrl, {
      r: 'user/login',
      user_name: username,
      user_pwd: pwd,
      ajax: 1,
    })
  }
}

export function isLogin() {
  return {
    type: USER_LOGIN,
    payload: axios.get(requestUrl + '?r=user/logined')
  }
}
