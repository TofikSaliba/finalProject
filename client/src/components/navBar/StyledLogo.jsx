import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledLogo = styled.div`
  position: fixed;
  display: flex;
  gap: 1rem;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  z-index: 18;
  align-items: center;
  img {
    width: 40px;
  }
  #logoText {
    height: 20px;
    width: 100px;
  }
  @media ${device.mobileL} {
    #logoText {
      display: none;
    }
  }
`;
