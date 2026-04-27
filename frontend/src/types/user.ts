export type UserRole = "admin" | "member" | "staff";

export interface User {
  id: string;
  avatar?: string;
  firstname: string;
  lastname: string;
  name: string; // computed from firstname + lastname
  email: string;
  role: UserRole;
  verified: boolean;
  active: boolean;
  joinedDate: string;
  stellarPublicKey?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateData {
  firstname?: string;
  lastname?: string;
  stellarPublicKey?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfilePictureUpload {
  file: File;
}

export interface NotificationSettings {
  emailNewBooking: boolean;
  emailBookingConfirmed: boolean;
  emailNewsletter: boolean;
}

export interface UserSettings extends NotificationSettings {
  theme: "light" | "dark" | "system";
}

// Auth-related types
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  settings: UserSettings | null;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
  message?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}