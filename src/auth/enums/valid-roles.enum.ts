import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  ADMIN = 'admin',
  CLIENT = 'client',
  EMPLOYEE = 'employee',
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
