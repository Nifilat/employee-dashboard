export interface AuthUser {
  uid: string;
  email: string;
  role: string;
  displayName?: string;
  profilePhoto?: string;
}