import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getSystemList = () => {
  return axios.request({
    url: 'api/admin/getsys',
    method: 'get'
  })
}

export const openSystem = (id,sdate,edate,flag) => {
  return axios.request({
    url: 'api/admin/product/open_sys',
    params:{
      startTime:sdate,
      endTime:edate,
      flag
    },
    method: 'get'
  })
}






export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}
