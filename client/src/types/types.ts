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
  address: string;
  coords: any;
  helpOffered: string[];
  usersToReview: string[];
  img?: string;
  age?: string;
  bio?: string;
  helper: boolean;
  password?: string;
  __v: number;
}

export interface contextsProviderProps {
  children: ReactNode;
  user?: User | null;
}

export interface UserContextValue {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  updateUsersToReview: () => void;
  logOut: () => void;
}

export interface CustomInputProps {
  id: string;
  type: string;
  value: string;
  inputLabel: string;
  required?: boolean;
  onChange: (e: any) => void;
}

export interface Coords {
  lat: number;
  lng: number;
}
export interface MarkerObj {
  _id: string;
  userID: string;
  userName: string;
  description: string;
  when: string;
  coords: Coords;
  address: string;
  expire: number;
  __v: number;
}

export interface NotificationObject {
  _id: string;
  userID: string;
  name: string;
  accepted?: boolean;
  accept?: string;
  reviewed?: boolean;
  markerID?: string;
}
export interface Notifications {
  notifications: NotificationObject[];
  unRead: number;
  helper: boolean;
}

export interface Review {
  _id: string;
  userID: string;
  name: string;
  content: string;
  time: string;
}

export interface Messages {
  text: string;
  sender: boolean;
  time: string;
}

export interface Recipent {
  recipentID: string;
  recipentName: string;
  img?: string;
  messages: Messages[];
  unRead: number;
}

export interface ChatObj {
  _id: string;
  chat: Recipent[];
  newMsgUsersIDs: string[];
  __v: number;
}
