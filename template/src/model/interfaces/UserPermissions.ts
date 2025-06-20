import { PermissionsResourceEnum } from '@/model/enums/PermissionsResourceEnum'
import { PermissionsObject } from './PermissionsObject'

export type UserPermissions = Record<PermissionsResourceEnum, PermissionsObject>
