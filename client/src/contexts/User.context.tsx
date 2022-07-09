import React, { useState, useContext, useEffect } from "react";
import { User, contextsProviderProps, UserContextValue } from "../types/types";
import { SetCookie, GetCookie, RemoveCookie } from "../services/jsCookie";
import serverAPI from "../api/serverApi";
import { headerOptions } from "../types/types";

const emptyUserContextValue: UserContextValue = {
  currentUser: null,
  setCurrentUser: function (): void {},
  token: null,
  setToken: function (): void {},
};

const UserContext = React.createContext<UserContextValue>(
  emptyUserContextValue
);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: contextsProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = GetCookie("userToken");
    if (savedToken) {
      const options: headerOptions = {
        headers: {
          Authorization: savedToken,
        },
      };

      (async function () {
        try {
          const { data } = await serverAPI(options).get("/users/profile");
          setCurrentUser(data.requestedUser);
          setToken(savedToken);
        } catch (err: any) {
          RemoveCookie("userToken");
          console.log(err.message);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const savedToken = GetCookie("userToken");
    if (token && !savedToken) {
      SetCookie("userToken", token);
    }
  }, [token]);

  const value: UserContextValue = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
