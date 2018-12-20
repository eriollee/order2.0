import {
    login
  } from '@/api/user'

export default {
    state: {
        userName: '',
        userId: '',
        access: '',
        hasGetInfo: false,
      },
    mutations: {

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
            // commit('setToken', data.token)
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
    }
}
