import userLoginStore from '@/store/login/login'

function usePermissions(permissionId: string) {
  const loginStore = userLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item) => item.includes(permissionId)) //取布尔值
}

export default usePermissions
