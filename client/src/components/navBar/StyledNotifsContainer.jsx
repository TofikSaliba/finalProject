import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledNotifsContainer = styled.div`
  background: #ccc;
  position: absolute;
  top: 110%;
  left: -80%;
  width: 240px;
  min-height: 40px;
  max-height: 300px;
  font-size: clamp(1.4rem, 3vw, 2rem);
  padding: 1rem;
  border-radius: 10px;
  overflow: scroll;
  overflow-x: hidden;
  a {
    text-decoration: none;
    text-transform: capitalize;
    color: blue;
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
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 35%;
    transform: rotate(45deg);
    width: 30px;
    height: 30px;
    background-color: #ccc;
    z-index: -1;
  }
  hr {
    margin: 1rem 0;
  }
  span {
    font-weight: bold;
  }
  .decidingContainer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    button {
      font-size: 1.4rem;
      padding: 0.5rem 1rem;
    }
  }
  @media ${device.mobileL} {
    &:before {
      left: 31%;
    }
  }
`;
