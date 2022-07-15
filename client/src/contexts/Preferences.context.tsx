import React, { useContext, useState } from "react";
import { contextsProviderProps } from "../types/types";
import { useLoadScript } from "@react-google-maps/api";

interface PreferencesContextValue {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hamburgerOpen: boolean;
  setHamburgerOpen: (hamburgerOpen: boolean) => void;
  toggleHamburger: () => void;
  toggleNotifications: () => void;
  isLoaded: boolean;
  displayNotifs: boolean;
  setDisplayNotifs: (hamburgerOpen: boolean) => void;
}

const emptyPreferencesContextValue: PreferencesContextValue = {
  isLoading: true,
  setIsLoading: function (): void {},
  hamburgerOpen: false,
  setHamburgerOpen: function (): void {},
  toggleHamburger: function (): void {},
  toggleNotifications: function (): void {},
  isLoaded: false,
  displayNotifs: false,
  setDisplayNotifs: function (): void {},
};

const PreferencesContext = React.createContext<PreferencesContextValue>(
  emptyPreferencesContextValue
);

export const usePreferences = () => useContext(PreferencesContext);

const libraries: ["places"] = ["places"];

const PreferencesProvider = ({ children }: contextsProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [displayNotifs, setDisplayNotifs] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP!,
    libraries,
  });

  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setDisplayNotifs((prev) => !prev);
  };

  const value: PreferencesContextValue = {
    isLoading,
    setIsLoading,
    hamburgerOpen,
    setHamburgerOpen,
    toggleHamburger,
    isLoaded,
    displayNotifs,
    setDisplayNotifs,
    toggleNotifications,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
