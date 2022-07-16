import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  gap: 5rem;
  h1 {
    margin-top: 5rem;
  }
  h1,
  h2,
  h3 {
    text-align: center;
  }
  img {
    width: 250px;
    border-radius: 2rem;
    align-self: center;
  }
  .botImgs {
    display: flex;
    justify-content: space-around;
  }
  @media ${device.custom1} {
    .botImgs {
      flex-direction: column;
      gap: 2rem;
    }
  }
`;
