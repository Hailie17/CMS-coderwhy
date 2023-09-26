const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
      // initialValue: 'aaa'   //初始化值
    },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
      // initialValue: 'bbb'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
      // initialValue: 'ccc'
    }
  ]
}
export default searchConfig
