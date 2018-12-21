import {
    login
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
            const data = res.data
            console.log(data)
            commit('setToken', 'admin')
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
    }
}
