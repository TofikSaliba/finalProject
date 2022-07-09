import React, { useContext, useState } from "react";
import { contextsProviderProps } from "../types/types";

interface PreferencesContextValue {
  isLoading: boolean;
  setIsLoading: (isHome: boolean) => void;
}

const emptyPreferencesContextValue: PreferencesContextValue = {
  isLoading: true,
  setIsLoading: function (): void {},
};

const PreferencesContext = React.createContext<PreferencesContextValue>(
  emptyPreferencesContextValue
);

export const usePreferences = () => useContext(PreferencesContext);

const PreferencesProvider = ({ children }: contextsProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const value: PreferencesContextValue = {
    isLoading,
    setIsLoading,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
