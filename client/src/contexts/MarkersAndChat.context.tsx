import React, { useContext, useState, useEffect } from "react";
import { contextsProviderProps, MarkerObj, User } from "../types/types";
import serverAPI from "../api/serverApi";
import { Coords } from "../types/types";
import { useSocket } from "./Socket.context";

interface MarkersAndChatContextValue {
  markers: MarkerObj[];
  setMarkers: (markers: MarkerObj[]) => void;
  addMarker: (
    currentUser: User,
    description: string,
    when: string,
    address: string,
    coords: Coords
  ) => void;
}

const emptyMarkersAndChatContextValue: MarkersAndChatContextValue = {
  markers: [],
  setMarkers: function (): void {},
  addMarker: function (): void {},
};

const MarkersAndChatContext = React.createContext<MarkersAndChatContextValue>(
  emptyMarkersAndChatContextValue
);

export const useMarkersAndChat = () => useContext(MarkersAndChatContext);

const MarkersAndChatProvider = ({ children }: contextsProviderProps) => {
  const [markers, setMarkers] = useState<MarkerObj[]>([]);
  const [refetchMarkers, setRefetchMarkers] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    (async function () {
      const { data } = await serverAPI().get("/markers/getAllMarkers");
      setMarkers(data.markers);
    })();
    socket?.on("updateMarkers", () => {
      setRefetchMarkers((prev) => !prev);
    });
    return () => socket?.off("updateMarkers");
  }, [refetchMarkers, socket]);

  const addMarker = async (
    currentUser: User,
    description: string,
    when: string,
    address: string,
    coords: Coords
  ) => {
    const { data } = await serverAPI().post("/markers/addMarker", {
      userID: currentUser?._id,
      userName: currentUser?.name,
      description,
      when,
      address,
      coords,
      expire: new Date(when).getTime(),
    });
    setMarkers((prev) => [...prev, data.newMarker]);
    socket.emit("markerAdded");
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
