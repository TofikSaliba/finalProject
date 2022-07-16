import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledMakeRequest = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 19;
  background: rgba(0, 0, 0, 0.2);

  .smallContainer {
    display: flex;
    flex-direction: column;
    background: #31a105;
    padding: 3rem;
    border-radius: 10px;
    width: 30%;
    min-width: 280px;
    gap: 2rem;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .closePopup {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
    .error {
      color: red;
      text-align: center;
      font-weight: bold;
      font-size: 1.5rem;
      min-height: 1.8rem;
    }
    h3 {
      text-align: center;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
    }
    @media ${device.customHeight} {
      overflow: scroll;
      max-height: 500px;
      gap: 0.7rem;
      textarea {
        font-size: 1.5rem;
        height: 120px;
      }
      input {
        min-height: 25px;
        font-size: 1.5rem;
      }
    }
    @media ${device.customHeight2} {
      max-height: 300px;
      gap: 0.6rem;
    }
  }
`;
