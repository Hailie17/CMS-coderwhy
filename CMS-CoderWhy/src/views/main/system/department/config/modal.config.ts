const modalConfig = {
  header: {
    newTitle: '新增部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称',
      initialValue: 'aaa' //初始化值
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入领导名称'
      // initialValue: 'bbb'
    },
    {
      type: 'select',
      labe: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: [
        { label: '财务部', value: 111 },
        { label: '市场部', value: 222 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
      // initialValue: 'ccc'
    }
  ]
}
export default modalConfig
