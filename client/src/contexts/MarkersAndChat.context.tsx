import React, { useContext, useState, useEffect } from "react";
import { contextsProviderProps, Marker, User } from "../types/types";
import serverAPI from "../api/serverApi";

interface MarkersAndChatContextValue {
  markers: Marker[];
  setMarkers: (markers: Marker[]) => void;
  addMarker: (currentUser: User, description: string, when: string) => boolean;
}

const emptyMarkersAndChatContextValue: MarkersAndChatContextValue = {
  markers: [],
  setMarkers: function (): void {},
  addMarker: function (): boolean {
    return true;
  },
};

const MarkersAndChatContext = React.createContext<MarkersAndChatContextValue>(
  emptyMarkersAndChatContextValue
);

export const useMarkersAndChat = () => useContext(MarkersAndChatContext);

const MarkersAndChatProvider = ({ children }: contextsProviderProps) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    (async function () {
      const { data } = await serverAPI().get("/markers/getAllMarkers");
      setMarkers(data.Markers);
    })();
  }, []);

  const addMarker = (currentUser: User, description: string, when: string) => {
    const userHasMarker = markers.find((marker) => {
      return marker.userID === currentUser._id;
    });
    if (userHasMarker) return false;
    const successHandler = async (position: any) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const { data } = await serverAPI().post("/markers/addMarker", {
        userID: currentUser?._id,
        description,
        when,
        lat,
        lng,
      });
      setMarkers((prev) => [...prev, data.newMarker]);
    };

    const errorHandler = async (errorObj: any) => {
      alert(errorObj.code + ": " + errorObj.message);

      const { data } = await serverAPI().post("/markers/addMarker", {
        userID: currentUser?._id,
        description,
        when,
        lat: 32.0831488,
        lng: 34.8930624,
      });
      setMarkers((prev) => [...prev, data.newMarker]);
    };
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    });
    return true;
  };

  const value: MarkersAndChatContextValue = {
    markers,
    setMarkers,
    addMarker,
  };

  return (
    <MarkersAndChatContext.Provider value={value}>
      {children}
    </MarkersAndChatContext.Provider>
  );
};

export default MarkersAndChatProvider;
