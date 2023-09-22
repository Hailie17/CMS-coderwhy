import { deleteUserById, postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const usersListResult = await postUserListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.userList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      this.postUserListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
