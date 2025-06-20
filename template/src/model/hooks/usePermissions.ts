import { PermissionsResourceEnum } from '@/model/enums/PermissionsResourceEnum.ts'
import { PermissionsActionEnum } from '@/model/enums/PermissionsActionEnum.ts'
import { UserRoleEnum } from '@/model/enums/UserRoleEnum.ts'
import { UserPermissions } from '@/model/interfaces/UserPermissions'

// Mock user data - replace with actual API call
const mockUser = {
  role: UserRoleEnum.ROLE_USER,
  permissions: {
    [PermissionsResourceEnum.EXAMPLE]: {
      [PermissionsActionEnum.READ]: true,
      [PermissionsActionEnum.MODIFY]: false,
      [PermissionsActionEnum.DELETE]: false,
    },
    [PermissionsResourceEnum.USER]: {
      [PermissionsActionEnum.READ]: true,
      [PermissionsActionEnum.MODIFY]: false,
      [PermissionsActionEnum.DELETE]: false,
    },
    [PermissionsResourceEnum.POST]: {
      [PermissionsActionEnum.READ]: true,
      [PermissionsActionEnum.MODIFY]: true,
      [PermissionsActionEnum.DELETE]: true,
    },
    [PermissionsResourceEnum.COMMENT]: {
      [PermissionsActionEnum.READ]: true,
      [PermissionsActionEnum.MODIFY]: true,
      [PermissionsActionEnum.DELETE]: false,
    },
    [PermissionsResourceEnum.SETTINGS]: {
      [PermissionsActionEnum.READ]: false,
      [PermissionsActionEnum.MODIFY]: false,
      [PermissionsActionEnum.DELETE]: false,
    },
  } as UserPermissions,
}

export const usePermissions = () => {
  // TODO: Replace with actual user data from API
  const user = mockUser
  const isLoading = false

  const getResource = (resource: PermissionsResourceEnum) => {
    if (!user || !user.permissions) return false

    const permissionsRecord = user.permissions[resource]

    if (!permissionsRecord) return false

    return permissionsRecord
  }

  const hasPermission = (resource: PermissionsResourceEnum, action: PermissionsActionEnum) => {
    if (user?.role === UserRoleEnum.ROLE_ADMIN) {
      return true
    }

    const resourcePermission = getResource(resource)

    if (!resourcePermission) return false

    return resourcePermission[action] === true
  }

  const canRead = (resource: PermissionsResourceEnum) =>
    hasPermission(resource, PermissionsActionEnum.READ)

  const canModify = (resource: PermissionsResourceEnum) =>
    hasPermission(resource, PermissionsActionEnum.MODIFY)

  const canDelete = (resource: PermissionsResourceEnum) =>
    hasPermission(resource, PermissionsActionEnum.DELETE)

  const canMutate = (resource: PermissionsResourceEnum) =>
    [PermissionsActionEnum.MODIFY, PermissionsActionEnum.DELETE].some((action) =>
      hasPermission(resource, action),
    )

  const canAnyOf = (resource: PermissionsResourceEnum, actions: PermissionsActionEnum[]) =>
    actions.some((action) => hasPermission(resource, action))

  const canAllOf = (resource: PermissionsResourceEnum, actions: PermissionsActionEnum[]) =>
    actions.every((action) => hasPermission(resource, action))

  const hasFieldAccess = (resource: PermissionsResourceEnum, field: string) => {
    if (user?.role === UserRoleEnum.ROLE_ADMIN) {
      return true
    }

    const resourcePermission = getResource(resource)

    if (!resourcePermission || !resourcePermission.fields) return true

    const fieldValue = resourcePermission.fields[field]

    if (typeof fieldValue === 'undefined') {
      return true
    }

    return fieldValue
  }

  const hasAnyReadPermission = (resources: PermissionsResourceEnum[]) =>
    resources.some((resource) => canRead(resource))

  return {
    hasPermission,
    canRead,
    canModify,
    canDelete,
    canMutate,
    canAnyOf,
    canAllOf,
    hasFieldAccess,
    hasAnyReadPermission,
    ready: !isLoading,
  }
}
