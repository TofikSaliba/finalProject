import React, { useContext, useState, useEffect } from "react";
import {
  contextsProviderProps,
  MarkerObj,
  User,
  Notifications,
  headerOptions,
} from "../types/types";
import serverAPI from "../api/serverApi";
import { Coords } from "../types/types";
import { useSocket } from "./Socket.context";
import { useUser } from "../contexts/User.context";

interface UsersUpdatesContextValue {
  notifications: Notifications | null;
  setNotifications: (notifications: any) => void;
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

const emptyUsersUpdatesContextValue: UsersUpdatesContextValue = {
  notifications: null,
  setNotifications: function (): void {},
  markers: [],
  setMarkers: function (): void {},
  addMarker: function (): void {},
};

const UsersUpdatesContext = React.createContext<UsersUpdatesContextValue>(
  emptyUsersUpdatesContextValue
);

export const useUsersUpdates = () => useContext(UsersUpdatesContext);

const UsersUpdatesProvider = ({ children }: contextsProviderProps) => {
  const [markers, setMarkers] = useState<MarkerObj[]>([]);
  const [refetchMarkers, setRefetchMarkers] = useState(false);
  const [refetchNotifs, setRefetchNotifs] = useState(false);
  const [notifications, setNotifications] = useState<Notifications | null>(
    null
  );
  const { socket } = useSocket();
  const { currentUser, token } = useUser();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await serverAPI().get("/markers/getAllMarkers");
        setMarkers(data.markers);
      } catch (err: any) {
        console.log(err.response.data || err.message);
      }
    })();
    socket?.on("updateMarkers", () => {
      setRefetchMarkers((prev) => !prev);
      setRefetchNotifs((prev) => !prev);
    });
    return () => socket?.off("updateMarkers");
  }, [refetchMarkers, socket]);

  useEffect(() => {
    if (currentUser) {
      const options: headerOptions = {
        headers: {
          Authorization: token!,
        },
      };
      (async function () {
        try {
          const { data } = await serverAPI(options).get(
            "/notifications/getUserNotifications"
          );
          setNotifications(data.notifications);
        } catch (err: any) {
          console.log(err.response.data || err.message);
        }
      })();
    }
  }, [currentUser, token, refetchNotifs]);

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

  const value: UsersUpdatesContextValue = {
    markers,
    setMarkers,
    addMarker,
    notifications,
    setNotifications,
  };

  return (
    <UsersUpdatesContext.Provider value={value}>
      {children}
    </UsersUpdatesContext.Provider>
  );
};

export default UsersUpdatesProvider;
