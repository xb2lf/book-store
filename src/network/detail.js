import { request } from './request';

export function getDetail(id) {
  return request({
    url: `/api/goods/${id}`,
    mehod: 'get'
  })
} 