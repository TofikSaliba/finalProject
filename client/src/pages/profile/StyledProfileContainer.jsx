import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 85%;
  height: 100%;
  gap: 5rem;
  .userInfo {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h2 {
      text-transform: capitalize;
      text-align: center;
      font-size: 5rem;
    }
    img {
      width: 60%;
      min-width: 200px;
      align-self: center;
      border-radius: 5rem;
    }
  }
  .reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }
  @media ${device.custom2} {
    grid-template-columns: 1fr;
    gap: 5rem;
    .userInfo {
      align-items: center;
      img {
        width: 30%;
      }
    }
  }
`;
