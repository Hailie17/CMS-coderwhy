import type { IModalConfig } from '@/components/page-modal/type'

const config = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '权限介绍', prop: 'intro', placeholder: '请输入权限介绍' },
    { type: 'custom', slotName: 'menulist' }
  ]
}

const modalConfig: IModalConfig = config

export default modalConfig
