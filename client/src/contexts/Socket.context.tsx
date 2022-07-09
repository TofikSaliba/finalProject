// import React, { useState, useEffect, useContext } from "react";
// import { User, contextsProviderProps, UserContextValue } from "../types/types";

// const emptyUserContextValue: UserContextValue = {
//   currentUser: null,
//   setCurrentUser: function (): void {},
//   token: null,
//   setToken: function (): void {},
// };

// const UserContext = React.createContext<UserContextValue>(
//   emptyUserContextValue
// );

// export function useUser() {
//   return useContext(UserContext);
// }

// export function UserProvider({ children }: contextsProviderProps) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   const value: UserContextValue = {
//     currentUser,
//     setCurrentUser,
//     token,
//     setToken,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// export default UserProvider;
export {};
