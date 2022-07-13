import { useState } from "react";
import { StyledInputContainer } from "../../components/customInput/styledInputContainer";
import { StyledMakeRequest } from "./StyledMakeRequest";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { useUser } from "../../contexts/User.context";
import { useMarkersAndChat } from "../../contexts/MarkersAndChat.context";
import MapSearchInput from "../../components/mapSearchInput/MapSearchInput";
import { usePreferences } from "../../contexts/Preferences.context";
import { getGeocode, getLatLng } from "use-places-autocomplete";

function MakeRequest({ close }: any) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [success, setSuccess] = useState(false);
  const { currentUser } = useUser();
  const { addMarker } = useMarkersAndChat();
  const { isLoaded } = usePreferences();

  const addMarkerAndClose = async () => {
    if (description === "" || date === "") {
      return setError("Must fill inputs");
    }
    let errorOccured = false;
    const coords = { lat: 0, lng: 0 };
    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = getLatLng(results[0]);
      coords.lat = lat;
      coords.lng = lng;
    } catch (err) {
      errorOccured = true;
      setError("Invalid Address!");
    }
    if (errorOccured) return;
    addMarker(currentUser!, description, date, value, coords);
    setSuccess(true);
  };

  return (
    <StyledMakeRequest>
      {isLoaded && (
        <div className="smallContainer">
          {!success && (
            <>
              <StyledInputContainer>
                <textarea
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <label
                  className={description && "filled"}
                  htmlFor="description"
                >
                  Describe what you need...
                </label>
              </StyledInputContainer>
              <h3>When?</h3>
              <input
                style={{ fontSize: "1.5rem" }}
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
                value={date}
              />
              <h3>Where?</h3>
              <MapSearchInput sendValue={value} setSendValue={setValue} />
              <div className="error">{error}</div>
              <div className="buttons">
                <StyledButton onClick={() => close(false)}>Cancel</StyledButton>
                <StyledButton onClick={addMarkerAndClose}>Add</StyledButton>
              </div>
            </>
          )}
          {success && (
            <div className="closePopup">
              <h3>Request Created!</h3>
              <StyledButton onClick={() => close(false)}>Close</StyledButton>
            </div>
          )}
        </div>
      )}
    </StyledMakeRequest>
  );
}

export default MakeRequest;
