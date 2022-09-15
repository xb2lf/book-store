/*
 * @Author: {baixiao}
 * @Date: 2022-09-13 13:43:19
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 20:12:06
 * @Description: 
 */
import { request } from "./request";

export function getHomeAllData() {
  return request({
    url: '/api/index',
    method: 'get',
    /* params:{}, */
  })
}

export function getHomeGoods(type = 'sales', page = 1) {
  return request({
    url: `/api/index?${type}=1&page=${page}`,
    method: 'get',
    /* params:{}, */
  })
}