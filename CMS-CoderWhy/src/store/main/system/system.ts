import {
  addPageData,
  addUserData,
  deletPageById,
  deleteUserById,
  editPageData,
  editUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
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
    },
    async addUserDataAction(userInfo: any) {
      //1. 创建新用户
      const addResult = await addUserData(userInfo)
      // 2. 请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    },

    /* 针对页面数据，增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDateAction()
    },
    async deletePageByIdAction(pageName: string, queryInfo: any) {
      const deleteResult = await deletPageById(pageName, queryInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDateAction()
    },
    async addPageByIdAction(pageName: string, queryInfo: any) {
      const addResult = await addPageData(pageName, queryInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDateAction()
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const editResult = await editPageData(pageName, id, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDateAction()
    }
  }
})

export default useSystemStore
