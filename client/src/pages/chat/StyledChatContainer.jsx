import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledChatContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 80%;
  background: beige;

  /* @media ${device.tablet} {
    width: 90%;
    min-width: 230px;
  } */
`;
