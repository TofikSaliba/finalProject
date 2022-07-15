import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 58%;
  min-width: 500px;
  gap: 2rem;
  background: burlywood;
  padding: 2rem;
  border-radius: 10px;
  a {
    text-decoration: none;
    text-transform: capitalize;
    color: blue;
  }
  span {
    font-weight: bold;
  }
  .reviewHeader {
    display: flex;
    justify-content: space-between;
  }
  @media ${device.tablet} {
    width: 90%;
    min-width: 230px;
  }
  @media ${device.mobileL} {
    width: 100%;
    padding: 1rem;
    span {
      font-size: 1.3rem;
    }
  }
`;
