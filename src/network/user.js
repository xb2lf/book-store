/*
 * @Author: {baixiao}
 * @Date: 2022-09-14 19:20:58
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 09:39:04
 * @Description: 
 */
/*
 * @Author: {baixiao}
 * @Date: 2022-09-14 19:20:58
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 20:58:41
 * @Description: 
 */
import { request } from "./request";

export function userRegister(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data,
  })
}

export function userLogin(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data,
  })
}
export function userLogout(data) {
  return request({
    url: '/api/auth/logout',
    method: 'post',
    data,
  })
}

export function getUser() {
  return request({
    url: "/api/user",
  });
}