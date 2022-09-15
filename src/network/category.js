/*
 * @Author: {baixiao}
 * @Date: 2022-09-14 13:23:22
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 14:31:03
 * @Description: 
 */
import { request } from "./request";

export function getCategory() {
  return request({
    url: '/api/goods',
    mehod: 'get',
  })
}
export function getCategoryGoods(order = 'sales', cid = 0, page = 1) {
  return request({
    url: `/api/goods?category_id=${cid}&page=${page}&${order}=1`,
    mehod: 'get',
  })
}