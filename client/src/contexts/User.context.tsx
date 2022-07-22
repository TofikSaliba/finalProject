import React, { useState, useContext, useEffect } from "react";
import { User, contextsProviderProps, UserContextValue } from "../types/types";
import { SetCookie, GetCookie, RemoveCookie } from "../services/jsCookie";
import serverAPI from "../api/serverApi";
import { headerOptions } from "../types/types";
import { usePreferences } from "./Preferences.context";

const emptyUserContextValue: UserContextValue = {
  currentUser: null,
  setCurrentUser: function (): void {},
  token: null,
  setToken: function (): void {},
  updateUsersToReview: function (): void {},
  logOut: function (): void {},
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
  const [refetchUser, setRefetchUser] = useState(false);
  const { setIsLoading } = usePreferences();

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
  }, [refetchUser]);

  useEffect(() => {
    const savedToken = GetCookie("userToken");
    if (token && !savedToken) {
      SetCookie("userToken", token);
    }
  }, [token]);

  const logOut = async () => {
    const options: headerOptions = {
      headers: {
        Authorization: token!,
      },
    };
    setIsLoading(true);
    try {
      await serverAPI(options).post("/users/logout");
      setToken(null);
      RemoveCookie("userToken");
      setCurrentUser(null);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsersToReview = () => {
    setRefetchUser((prev) => !prev);
  };

  const value: UserContextValue = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    updateUsersToReview,
    logOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
