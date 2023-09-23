export interface Iuser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
export interface ISystemState {
  userList: Iuser[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}
