const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称'
      // initialValue: 'aaa'   //初始化值
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入领导名称'
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
