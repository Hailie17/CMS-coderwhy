import { postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUserListAction() {
      const usersListResult = await postUserListData()
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.userList = list
    }
  }
})

export default useSystemStore
