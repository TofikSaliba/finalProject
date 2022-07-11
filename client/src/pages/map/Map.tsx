import { useEffect, useMemo } from "react";
import { usePreferences } from "../../contexts/Preferences.context";
import {
  GoogleMap,
  //   useLoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

function Map() {
  const { setIsLoading, isLoading, setHamburgerOpen, hamburgerOpen } =
    usePreferences();
  const center = useMemo(() => ({ lat: 32.799, lng: 35 }), []);
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
    const arr = [
      { lat: 32.8, lng: 35 },
      { lat: 32.799, lng: 35.01 },
      { lat: 32.78, lng: 35 },
    ];
    return arr.map((el, idx) => {
      return <Marker key={idx} onClick={handleMarkerClick} position={el} />;
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
