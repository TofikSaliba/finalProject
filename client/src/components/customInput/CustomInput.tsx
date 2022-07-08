import { StyledInputContainer } from "./styledInputContainer";
import { CustomInputProps } from "../../types/types";

function CustomInput({
  id,
  type,
  value,
  onChange,
  inputLabel,
  required,
}: CustomInputProps) {
  return (
    <StyledInputContainer>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required || false}
      ></input>
      <label htmlFor={id} className={value && "filled"}>
        {inputLabel}
      </label>
    </StyledInputContainer>
  );
}

export default CustomInput;
