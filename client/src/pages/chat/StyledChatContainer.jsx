import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledChatContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 1000px;
  height: 85vh;
  border-radius: 10px;
  padding: 2rem;
  background: #e1e1e1;
  .recipentsNames {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-right: 1rem;
    border-right: 1px solid #111;
    overflow: scroll;
    .recipent {
      font-size: clamp(1.4rem, 3vw, 2.5rem);
      text-transform: capitalize;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.3rem 0;
      cursor: pointer;
      border-bottom: 1px solid #111;
      img {
        width: 40px;
        border-radius: 50%;
      }
    }
    .recipent.current {
      background: #37b804;
      border-radius: 1rem;
      border: none;
      color: #fff;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      display: none;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .chatBoxContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 1rem;
    font-size: clamp(1.4rem, 3vw, 2rem);
    overflow-y: hidden;
    .chatBox {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: scroll;
      overflow-x: hidden;
      gap: 1rem;
      .textCont {
        display: flex;
        align-items: center;
        gap: 1rem;
        .text {
          padding: 0.5rem 1rem;
          border-radius: 2rem;
        }
        .text.recipent {
          background: #fff;
        }
        .text.sender {
          background: #3cc706;
        }
        span {
          font-size: 1.3rem;
          display: none;
        }
      }

      .textCont.sender {
        justify-content: flex-end;
      }
      .textCont:hover > span {
        display: inline;
      }
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        display: none;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
    form {
      display: flex;
      button {
        padding: 0.3rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  @media ${device.mobileL} {
    padding: 0.3rem;
    .recipentsNames {
      gap: 1.5rem;
      padding-right: 0.5rem;
      .recipent {
        gap: 0.4rem;
        img {
          width: 30px;
        }
      }
    }
    .chatBox {
      padding-left: 0.5rem;
    }
  }
  @media ${device.customHeight} {
    height: 75vh;
  }
`;
