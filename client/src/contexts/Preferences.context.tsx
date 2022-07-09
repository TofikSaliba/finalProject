import React, { useContext, useState } from "react";
import { contextsProviderProps } from "../types/types";

interface PreferencesContextValue {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hamburgerOpen: boolean;
  setHamburgerOpen: (hamburgerOpen: boolean) => void;
  toggleHamburger: () => void;
}

const emptyPreferencesContextValue: PreferencesContextValue = {
  isLoading: true,
  setIsLoading: function (): void {},
  hamburgerOpen: false,
  setHamburgerOpen: function (): void {},
  toggleHamburger: function (): void {},
};

const PreferencesContext = React.createContext<PreferencesContextValue>(
  emptyPreferencesContextValue
);

export const usePreferences = () => useContext(PreferencesContext);

const PreferencesProvider = ({ children }: contextsProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };

  const value: PreferencesContextValue = {
    isLoading,
    setIsLoading,
    hamburgerOpen,
    setHamburgerOpen,
    toggleHamburger,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
