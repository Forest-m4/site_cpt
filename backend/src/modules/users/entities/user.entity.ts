export enum UserRole {
  READER = 'READER',
  AUTHOR = 'AUTHOR',
}

export interface User {
  id: number;
  email: string;
  password: string; // хэш
  role: UserRole;
}
