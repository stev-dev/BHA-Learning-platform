export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export interface UserMetadata {
  roles: UserRole[];
}

export interface AuthSession {
  email: string;
  unsafeMetadata: UserMetadata;
}

export interface User {
  emailAddresses: Array<{
    emailAddress: string;
  }>;
  unsafeMetadata: UserMetadata;
}

export const isValidRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};
