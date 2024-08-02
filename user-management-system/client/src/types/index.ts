// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
