import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 90%;
  height: 90vh;
  .userInfo {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h2 {
      text-align: center;
      font-size: 5rem;
    }
    img {
      width: 60%;
      min-width: 200px;
      align-self: center;
    }
  }
  .reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
