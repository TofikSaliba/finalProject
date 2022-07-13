import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledInfowindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 250px;
  padding: 1rem;
  font-size: 1.5rem;
  span {
    font-weight: bold;
  }
  .windowBtns {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    button {
      font-size: 1.4rem;
      padding: 0.5rem 1rem;
    }
  }
  @media ${device.mobileL} {
    .windowBtns {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
  @media ${device.mobileM} {
    .windowBtns {
      align-items: flex-start;
    }
  }
`;
