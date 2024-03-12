import { UserType } from '@prisma/client';

export interface User {
  id?: number;
  email: string;
  password: string;
  type?: UserType;
  isVerified?: boolean;
  isPremium?: boolean;
  isBanned?: boolean;
}

export interface CreateUserInterface extends User {
  name: string;
  confirmPassword: string;
  adminKey?: string;
}
