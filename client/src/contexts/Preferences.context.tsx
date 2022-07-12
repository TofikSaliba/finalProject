import React, { useContext, useState } from "react";
import { contextsProviderProps } from "../types/types";
import { useLoadScript } from "@react-google-maps/api";

interface PreferencesContextValue {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hamburgerOpen: boolean;
  setHamburgerOpen: (hamburgerOpen: boolean) => void;
  toggleHamburger: () => void;
  isLoaded: boolean;
}

const emptyPreferencesContextValue: PreferencesContextValue = {
  isLoading: true,
  setIsLoading: function (): void {},
  hamburgerOpen: false,
  setHamburgerOpen: function (): void {},
  toggleHamburger: function (): void {},
  isLoaded: false,
};

const PreferencesContext = React.createContext<PreferencesContextValue>(
  emptyPreferencesContextValue
);

export const usePreferences = () => useContext(PreferencesContext);

const libraries: ["places"] = ["places"];

const PreferencesProvider = ({ children }: contextsProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP!,
    libraries,
  });

  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };

  const value: PreferencesContextValue = {
    isLoading,
    setIsLoading,
    hamburgerOpen,
    setHamburgerOpen,
    toggleHamburger,
    isLoaded,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
