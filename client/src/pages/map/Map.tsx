import { useEffect, useMemo } from "react";
import {
  GoogleMap,
  //   useLoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { usePreferences } from "../../contexts/Preferences.context";
import { useMarkersAndChat } from "../../contexts/MarkersAndChat.context";

const centerInit = {
  lat: 0,
  lng: 0,
};

navigator.geolocation.getCurrentPosition(async (position) => {
  centerInit.lat = position.coords.latitude;
  centerInit.lng = position.coords.longitude;
});

function Map() {
  const { markers } = useMarkersAndChat();
  const { setIsLoading, isLoading, setHamburgerOpen, hamburgerOpen } =
    usePreferences();
  const center = useMemo(() => centerInit, []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP!,
  });

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

  const handleMarkerClick = (marker: any) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: marker.latLng!.lat(),
      lng: marker.latLng!.lng(),
    };

    console.log(latlng.lat, latlng.lng, "lat and lng from marker");

    geocoder.geocode({ location: latlng }).then((response) => {
      console.log(response.results[0].formatted_address);
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
        <div onClick={closeMenu} className="map-wrapper">
          <GoogleMap
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
      )}
    </>
  );
}

export default Map;
