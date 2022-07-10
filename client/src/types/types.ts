import { ReactNode } from "react";

export interface headerOptions {
  headers?: {
    Authorization?: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  img?: string;
  age?: string;
  from?: string;
  bio?: string;
  helper: boolean;
  password?: string;
  __v: number;
}

export interface contextsProviderProps {
  children: ReactNode;
  id?: string | null;
}

export interface UserContextValue {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export interface CustomInputProps {
  id: string;
  type: string;
  value: string;
  inputLabel: string;
  required?: boolean;
  onChange: (e: any) => void;
}
