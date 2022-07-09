import { useEffect, useMemo } from "react";
import { usePreferences } from "../../contexts/Preferences.context";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map() {
  const { setIsLoading, isLoading } = usePreferences();
  const center = useMemo(() => ({ lat: 32.799, lng: 35 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP!,
  });

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded, setIsLoading]);

  return (
    <>
      {!isLoading && isLoaded && (
        <div className="map-wrapper">
          <GoogleMap
            zoom={14}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      )}
    </>
  );
}

export default Map;
