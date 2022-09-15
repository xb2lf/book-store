/*
 * @Author: {baixiao}
 * @Date: 2022-09-13 13:43:25
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 07:43:20
 * @Description: 
 */
import { request } from "./request";

export function addCart(data) {
  return request({
    url: '/api/carts',
    method: 'post',
    data,
  })
}
export function modifyCart(id, data) {
  return request({
    url: `/api/carts/${id}`,
    method: 'put',
    data,
  })
}
export function checkedyCart(data) {
  return request({
    url: '/api/carts/checked',
    method: 'patch',
    data,
  })
}
export function deleteCart(id) {
  return request({
    url: `/api/carts/${id}`,
    method: 'delete',
  })
}
export function getCart(data = '') {
  return request({
    url: `/api/carts?${data}`,
    method: 'get',
  })
}