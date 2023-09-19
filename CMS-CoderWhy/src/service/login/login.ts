import hyRequest from '..'
import type { IAcount } from '@/types'

export function accountLoginRequest(account: IAcount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
