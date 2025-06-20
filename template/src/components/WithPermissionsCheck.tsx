import React, { PropsWithChildren } from 'react'
import { PermissionsResourceEnum } from '@/model/enums/PermissionsResourceEnum.ts'
import { PermissionsActionEnum } from '@/model/enums/PermissionsActionEnum.ts'
import { usePermissions } from '@/model/hooks/usePermissions.ts'

interface Props extends PropsWithChildren {
  resource: PermissionsResourceEnum
  actions: PermissionsActionEnum[]
  any?: boolean // Set to true if only one of the actions have to pass
}

export const WithPermissionsCheck: React.FC<Props> = ({ resource, actions, any, children }) => {
  const { canAnyOf, canAllOf } = usePermissions()

  const hasPermission = any ? canAnyOf(resource, actions) : canAllOf(resource, actions)

  if (!hasPermission) {
    return null
  }

  return children
}
