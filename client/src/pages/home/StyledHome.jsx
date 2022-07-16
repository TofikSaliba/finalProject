import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  gap: 3rem;
  text-align: center;
  a {
    width: min-content;
  }
  h1 {
    margin-top: 5rem;
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
