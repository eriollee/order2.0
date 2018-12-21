import {
    login,
    logout
  } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        access: '',
        token: getToken(),
        hasGetInfo: false,
      },
    mutations: {
      setToken (state, token) {
        state.token = token
        setToken(token)
      },
      setUserName (state, name) {
        state.userName = name
      },
      setAccess (state, access) {
        state.access = access
      },
    },
    actions: {
        // 登录
      handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
        return new Promise((resolve, reject) => {
          login({
            userName,
            password
          }).then(res => {
            const data = res.data.data.data
            commit('setToken', 'admin')
            commit('setUserName', data.userName)
            commit('setAccess', data.userRoles)
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
       // 退出登录
      handleLogOut ({ state, commit }) {
        return new Promise((resolve, reject) => {
          logout(state.token).then(() => {
            commit('setToken', '')
            commit('setAccess', [])
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
    }
}
