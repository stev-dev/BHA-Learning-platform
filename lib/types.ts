export interface User {
  name: string;
  email: string;
  password: string;
  isPartner?: boolean;
  diploma?: string;
  subject?: string;
  specialty?: string;
  createdAt?: Date;
}
