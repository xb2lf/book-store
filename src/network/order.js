/*
 * @Author: {baixiao}
 * @Date: 2022-09-15 13:26:18
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 15:33:11
 * @Description: 
 */
import { request } from "./request";

export function createOrder(data) {
  return request({
    url: '/api/orders',
    mehod: 'post',
    data,
  })
}
export function confirmOrder(id) {
  return request({
    url: `/api/orders/${id}/confirm`,
    mehod: 'patch',
  })
}
export function commentOrder(id) {
  return request({
    url: `/api/orders/${id}/comment`,
    mehod: 'post',
  })
}
export function payTest(id) {
  return request({
    url: `/api/orders/${id}/paytest`,
    mehod: 'patch',
  })
}

export function getOrderPreview() {
  return request({
    url: '/api/orders/preview'
  })
}
export function getOrderList(params) {
  return request({
    url: '/api/orders',
    params,
  })
}
export function getOrderDetail(id) {
  return request({
    url: `/api/orders/${id}`,
    params: {
      include: 'user,orderDetail.goods'
    },
  })
}
export function getExpressDetail(id) {
  return request({
    url: `/api/orders/${id}/express`,
  })
}

export function payOrder(id, params) {
  return request({
    url: `/api/orders/${id}/pay`,
    params,
  })
}
export function payOrderStatus(id) {
  return request({
    url: `/api/orders/${id}/status`,
  })
}
