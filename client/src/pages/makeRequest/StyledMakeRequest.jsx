import styled from "styled-components";

export const StyledMakeRequest = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 19;
  .smallContainer {
    display: flex;
    flex-direction: column;
    background: #2d62f3;
    padding: 3rem;
    border-radius: 10px;
    width: 30%;
    min-width: 280px;
    gap: 2rem;
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
  }
`;
