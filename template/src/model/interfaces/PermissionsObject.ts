import { PermissionsActionEnum } from '@/model/enums/PermissionsActionEnum'

export interface PermissionsObject extends Record<PermissionsActionEnum, boolean> {
  fields?: Record<string, boolean>
  nested?: []
}
