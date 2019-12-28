import request from '@/utils/request'
// https://bot-production.letsmovienow.com/

export function fetchOutline(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_API}api/trend/outline`,
    method: 'post',
    data
  })
}

export function fetchConversion(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_API}api/trend/conversion`,
    method: 'post',
    data
  })
}
