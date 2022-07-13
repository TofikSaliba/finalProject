import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledNotifsContainer = styled.div`
  background: #ccc;
  position: absolute;
  top: 110%;
  left: -80%;
  width: 240px;
  min-height: 40px;
  font-size: clamp(1.4rem, 3vw, 2rem);
  padding: 1rem;
  border-radius: 10px;
  &:before {
    content: "";
    position: absolute;
    top: -15%;
    left: 35%;
    transform: rotate(45deg);
    width: 30px;
    height: 30px;
    background-color: #ccc;
    z-index: -1;
  }
  hr {
    margin: 1rem 0;
  }
  span {
    font-weight: bold;
  }
  @media ${device.mobileL} {
    &:before {
      left: 31%;
    }
  }
`;
