import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'api/session/login_mail',
    data,
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'api/session/logout',
    method: 'get'
  })
}
