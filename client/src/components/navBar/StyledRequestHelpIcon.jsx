import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledRequestHelpIcon = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  cursor: pointer;
  font-size: 5rem;
  z-index: 20;
  @media ${device.tablet} {
    font-size: 4rem;
    bottom: 0;
    right: 1rem;
  }
`;
