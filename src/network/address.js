/*
 * @Author: {baixiao}
 * @Date: 2022-09-15 10:23:08
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 12:03:27
 * @Description: 
 */
import { request } from "./request";

export function addAddress(data) {
  return request({
    url: '/api/address',
    method: 'post',
    data,
  })
}
export function editAddress(id, data) {
  return request({
    url: `/api/address/${id}`,
    method: 'put',
    data,
  })
}
export function deleteAddress(id) {
  return request({
    url: `/api/address/${id}`,
    method: 'delete',
  })
}
export function setDefaultAddress(id) {
  return request({
    url: `/api/address/${id}/default`,
    method: 'patch',
  })
}
export function getAddressList() {
  return request({
    url: '/api/address',
    method: 'get',
  })
}
export function getAddressDetail(id) {
  return request({
    url: `/api/address/${id}`,
    method: 'get',
  })
}