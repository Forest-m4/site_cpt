export enum UserRoleEnum {
  READER = 'reader',
  AUTHOR = 'author',
}

export type UserRole = 'reader' | 'author';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserRole = {
  READER: 'reader' as const,
  AUTHOR: 'author' as const,
};
