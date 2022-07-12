import { useState } from "react";
import { StyledInputContainer } from "../../components/customInput/styledInputContainer";
import { StyledMakeRequest } from "./StyledMakeRequest";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { useUser } from "../../contexts/User.context";
import { useMarkersAndChat } from "../../contexts/MarkersAndChat.context";
import MapSearchInput from "../../components/mapSearchInput/MapSearchInput";
import { usePreferences } from "../../contexts/Preferences.context";

function MakeRequest({ close }: any) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const { currentUser } = useUser();
  const { addMarker } = useMarkersAndChat();
  const { isLoaded } = usePreferences();

  const addMarkerAndClose = () => {
    if (description === "" || date === "") {
      return setError("Must fill inputs");
    }
    if (addMarker(currentUser!, description, date)) {
      close(false);
    } else {
      setError("Already have an open request!");
    }
  };

  console.log(value);

  return (
    <StyledMakeRequest>
      {isLoaded && (
        <div className="smallContainer">
          <MapSearchInput sendValue={setValue} />
          <StyledInputContainer>
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <label className={description && "filled"} htmlFor="description">
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
          <div className="error">{error}</div>
          <div className="buttons">
            <StyledButton onClick={() => close(false)}>Cancel</StyledButton>
            <StyledButton onClick={addMarkerAndClose}>Add</StyledButton>
          </div>
        </div>
      )}
    </StyledMakeRequest>
  );
}

export default MakeRequest;
