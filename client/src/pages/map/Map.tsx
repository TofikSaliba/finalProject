import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  // useJsApiLoader,
} from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { usePreferences } from "../../contexts/Preferences.context";
import { useUser } from "../../contexts/User.context";
import { useMarkersAndChat } from "../../contexts/MarkersAndChat.context";
import MapSearchInput from "../../components/mapSearchInput/MapSearchInput";
import { StyledSearch } from "./StyledSearch";
import { StyledButton } from "../../components/styledButton/StyledButton";

function Map() {
  const { markers } = useMarkersAndChat();
  const { currentUser } = useUser();
  const { setIsLoading, isLoading, setHamburgerOpen, hamburgerOpen, isLoaded } =
    usePreferences();
  const center = useMemo(() => currentUser?.coords, [currentUser]);
  const [value, setValue] = useState("");
  const mapRef: any = useRef();
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded) {
      setIsLoading(false);
    }
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

  const goToAddress = async () => {
    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = getLatLng(results[0]);
      panTo({ lat, lng });
      console.log(lat, lng);
    } catch (error) {
      console.log("😱 Error: ");
    }
  };

  const handleMarkerClick = (marker: any) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: marker.latLng!.lat(),
      lng: marker.latLng!.lng(),
    };

    console.log(latlng.lat, latlng.lng, "lat and lng from marker");

    geocoder
      .geocode({ address: "Ha-Rav Friedman St 9, Tel Aviv-Yafo, Israel" })
      .then((response) => {
        // console.log(response.results[0].formatted_address);
        console.log(
          response.results[0].geometry.location.lat(),
          response.results[0].geometry.location.lng()
        );
      });
  };

  const getMarkers = () => {
    return markers.map((marker, idx) => {
      return (
        <Marker
          key={idx}
          onClick={handleMarkerClick}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      );
    });
  };

  return (
    <>
      {!isLoading && isLoaded && (
        <>
          <StyledSearch>
            <MapSearchInput sendValue={setValue} />
            <StyledButton onClick={goToAddress}>go</StyledButton>
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
            </GoogleMap>
          </div>
        </>
      )}
    </>
  );
}

export default Map;
