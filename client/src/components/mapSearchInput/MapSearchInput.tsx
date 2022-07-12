import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { StyledInputContainer } from "../customInput/styledInputContainer";

import "@reach/combobox/styles.css";

function MapSearchInput({ sendValue }: any) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (e: any) => {
    setValue(e.target.value);
    sendValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    sendValue(address);
    clearSuggestions();
  };

  return (
    <>
      <Combobox className="Combobox" onSelect={handleSelect}>
        <StyledInputContainer>
          <label htmlFor="address" className={value && "filled"}>
            Enter Address...
          </label>
          <ComboboxInput
            id="address"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            required
          />
        </StyledInputContainer>
        <ComboboxPopover className="searchX">
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}

export default MapSearchInput;
