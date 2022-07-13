import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledIcons = styled.div`
  position: fixed;
  display: flex;
  gap: 2rem;
  top: 1rem;
  right: auto;
  cursor: pointer;
  font-size: 4rem;
  z-index: 18;
  .icon {
    color: #111;
  }
  @media ${device.mobileL} {
    font-size: 3.5rem;
  }
`;
