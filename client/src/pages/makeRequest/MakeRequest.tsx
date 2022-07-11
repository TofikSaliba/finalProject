import { useEffect, useState } from "react";
import { StyledInputContainer } from "../../components/customInput/styledInputContainer";
import { StyledMakeRequest } from "./StyledMakeRequest";

interface userLocation {
  lng: number;
  lat: number;
}

function MakeRequest({ close }: any) {
  const [location, setLocation] = useState<userLocation>();
  const [description, setDescription] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <StyledMakeRequest>
      <div className="smallContainer">
        <StyledInputContainer>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required={true}
          />
          <label className={description && "filled"} htmlFor="description">
            Describe what you need...
          </label>
        </StyledInputContainer>
      </div>
    </StyledMakeRequest>
  );
}

export default MakeRequest;
