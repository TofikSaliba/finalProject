import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Redirect, NavLink } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  // useJsApiLoader,
} from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { usePreferences } from "../../contexts/Preferences.context";
import { useUser } from "../../contexts/User.context";
import { useUsersUpdates } from "../../contexts/UsersUpdates.context";
import MapSearchInput from "../../components/mapSearchInput/MapSearchInput";
import { StyledSearch } from "./StyledSearch";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { headerOptions, MarkerObj } from "../../types/types";
import markerIcon from "../../assets/images/marker.svg";
import { StyledInfowindow } from "./StyledInfowindow";
import { useSocket } from "../../contexts/Socket.context";
import serverAPI from "../../api/serverApi";
import { useChat } from "../../contexts/Chat.context";

function Map() {
  const { markers } = useUsersUpdates();
  const { currentUser, token, setCurrentUser } = useUser();
  const { setIsLoading, isLoading, setHamburgerOpen, hamburgerOpen, isLoaded } =
    usePreferences();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const center = useMemo(() => currentUser?.coords, []);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<MarkerObj | null>(null);
  const [canHelp, setCanHelp] = useState(true);
  const mapRef: any = useRef();
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);
  const { socket } = useSocket();
  const { startConversation } = useChat();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (isLoaded) {
        setIsLoading(false);
      }
    }, 500);
  }, [isLoaded, setIsLoading]);

  const closeMenu = () => {
    if (hamburgerOpen) {
      setHamburgerOpen(false);
    }
  };

  const panTo = useCallback(({ lat, lng }: any) => {
    mapRef.current!.panTo({ lat, lng });
    mapRef.current!.setZoom(14);
  }, []);

  const goToAddress = async (e: any) => {
    e.preventDefault();
    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = getLatLng(results[0]);
      panTo({ lat, lng });
      setValue("");
    } catch (error) {
      console.log("😱 Error: ");
    }
  };

  const getMarkers = () => {
    return markers.map((marker, idx) => {
      return (
        <Marker
          key={idx}
          onClick={() => {
            setSelected(marker);
            if (currentUser?.helpOffered.includes(marker._id)) {
              setCanHelp(false);
            } else {
              setCanHelp(true);
            }
          }}
          position={{ lat: marker.coords.lat, lng: marker.coords.lng }}
          icon={{
            url: markerIcon,
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
      );
    });
  };

  const handleSendHelp = async () => {
    setCanHelp(false);
    socket.emit("offerHelp", { to: selected?.userID, markerID: selected?._id });
    const options: headerOptions = {
      headers: {
        Authorization: token!,
      },
    };
    try {
      const { data } = await serverAPI(options).put(
        "/users/updateHelpOffered",
        {
          toUser: selected?._id,
        }
      );
      setCurrentUser(data.updatedUser);
    } catch (err: any) {
      console.log(err.response.data || err.message);
    }
  };

  if (!isLoading && !currentUser?.helper) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {!isLoading && isLoaded && (
        <>
          <StyledSearch onSubmit={goToAddress}>
            <MapSearchInput sendValue={value} setSendValue={setValue} />
            <button>go</button>
          </StyledSearch>
          <div onClick={closeMenu} className="map-wrapper">
            <GoogleMap
              onLoad={onMapLoad}
              zoom={14}
              center={center}
              mapContainerClassName="map-container"
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
              }}
            >
              {getMarkers()}
              {selected ? (
                <InfoWindow
                  position={selected.coords}
                  onCloseClick={() => setSelected(null)}
                >
                  <StyledInfowindow>
                    <div>
                      <span>{selected.userName}</span> needs help with:
                    </div>
                    <div>{selected.description}</div>
                    <div>
                      In: <span>{new Date(selected.when).toUTCString()}</span>
                    </div>
                    <div>
                      Address: <span>{selected.address}</span>
                    </div>
                    <div className="windowBtns">
                      <NavLink to={`/profile/${selected.userID}`}>
                        <StyledButton>Profile</StyledButton>
                      </NavLink>
                      <NavLink to="/chat">
                        <StyledButton
                          onClick={() =>
                            startConversation(
                              selected.userID,
                              selected.userName
                            )
                          }
                        >
                          Message
                        </StyledButton>
                      </NavLink>

                      {canHelp && (
                        <StyledButton
                          disabled={!canHelp}
                          onClick={handleSendHelp}
                        >
                          Help
                        </StyledButton>
                      )}
                    </div>
                  </StyledInfowindow>
                </InfoWindow>
              ) : (
                <></>
              )}
            </GoogleMap>
          </div>
        </>
      )}
    </>
  );
}

export default Map;
