import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledRecipent = styled.div`
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  text-transform: capitalize;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.3rem 0;
  cursor: pointer;
  background: ${(props) => (props.current ? "#37b804" : "")};
  border-radius: ${(props) => (props.current ? "1rem" : "0")};
  border-bottom: ${(props) => (props.current ? "none" : "1px solid #111")};
  color: ${(props) => (props.current ? "#fff" : "#111")};
  img {
    width: 40px;
    border-radius: 50%;
  }
  &::after {
    content: "${(props) => (props.unReadCount > 0 ? props.unReadCount : "")}";
    position: absolute;
    width: 20px;
    height: 20px;
    padding: 0.1rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    bottom: -1rem;
    right: 0px;
    color: #fff;
    background: ${(props) => (props.unReadCount > 0 ? "red" : "transparent")};
    border-radius: 50%;
    z-index: 18;
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
  @media ${device.mobileL} {
    gap: 0.4rem;
    img {
      width: 30px;
    }
  }
`;
