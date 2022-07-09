import { useEffect, useMemo } from "react";
import { usePreferences } from "../../contexts/Preferences.context";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map() {
  const { setIsLoading } = usePreferences();
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP!,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Map;
