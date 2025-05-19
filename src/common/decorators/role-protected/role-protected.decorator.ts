import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/common/interfaces/valid-roles';

export const EXEC_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) =>
  SetMetadata(EXEC_ROLES, args);
