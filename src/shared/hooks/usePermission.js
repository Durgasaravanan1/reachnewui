import { useUserRole } from '@/store/auth.store'
import { PERMISSIONS } from '@/shared/constants/permissions'

/** Returns true if current user's role has permission for the given action */
export function usePermission(action) {
  const role = useUserRole()
  return PERMISSIONS[action]?.includes(role) ?? false
}

/** Returns true if current user has ALL listed permissions */
export function usePermissions(actions) {
  const role = useUserRole()
  return actions.every((a) => PERMISSIONS[a]?.includes(role) ?? false)
}