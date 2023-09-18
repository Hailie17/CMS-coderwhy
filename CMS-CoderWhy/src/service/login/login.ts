import hyRequest from '..'
import type { IAcount } from '@/types'

export function accountLoginRequest(account: IAcount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
