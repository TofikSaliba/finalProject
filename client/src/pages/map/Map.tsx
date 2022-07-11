import { useEffect, useState } from "react";
import {
  GoogleMap,
  //   useLoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { usePreferences } from "../../contexts/Preferences.context";
import { useMarkersAndChat } from "../../contexts/MarkersAndChat.context";

function Map() {
  const { markers } = useMarkersAndChat();
  const { setIsLoading, isLoading, setHamburgerOpen, hamburgerOpen } =
    usePreferences();
  const [Center, setCenter] = useState<any>();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP!,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
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
            center={Center}
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
