import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledSearch = styled.div`
  position: absolute;
  top: 2rem;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  @media ${device.mobileL} {
    margin: 0;
    align-self: flex-start;
  }
  @media ${device.mobileM} {
    flex-direction: column;
    top: 0.5rem;
    align-items: flex-end;
    input {
      width: 220px;
      font-size: 1.4rem;
    }
  }
`;
