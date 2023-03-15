import { Tenant, User } from '@prisma/client';
import { TenantModel } from './tenant';
import { UserModel } from "./user";
export {
    UserModel as User,
    TenantModel as Tenant,
}
export type { User as UserType, Tenant as TenantType } from '@prisma/client'
