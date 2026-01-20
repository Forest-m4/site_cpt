export enum UserRoleEnum {
  READER = 'reader',
  AUTHOR = 'author',
}

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
