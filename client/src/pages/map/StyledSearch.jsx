import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledSearch = styled.form`
  position: absolute;
  top: 6rem;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  button {
    display: none;
  }

  @media ${device.mobileS} {
    input {
      width: 200px;
      font-size: 1.4rem;
    }
  }
`;
