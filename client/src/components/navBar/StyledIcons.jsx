import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledIcons = styled.div`
  position: fixed;
  display: flex;
  gap: 2rem;
  top: 1rem;
  right: auto;
  font-size: 4rem;
  z-index: 18;
  .icon {
    color: #111;
    cursor: pointer;
  }
  &::before {
    content: "${(props) => (props.notCount > 0 ? props.notCount : "")}";
    position: absolute;
    width: 16px;
    height: 16px;
    padding: 0.1rem;
    font-size: 1.4rem;
    text-align: center;
    font-weight: bold;
    top: 3%;
    left: 20%;
    color: #fff;
    background: ${(props) => (props.notCount > 0 ? "red" : "transparent")};
    border-radius: 50%;
    z-index: 18;
  }
  &::after {
    content: "${(props) => (props.msgCount > 0 ? props.msgCount : "")}";
    position: absolute;
    width: 16px;
    height: 16px;
    padding: 0.1rem;
    font-size: 1.4rem;
    text-align: center;
    font-weight: bold;
    top: 3%;
    right: -5px;
    color: #fff;
    background: ${(props) => (props.msgCount > 0 ? "red" : "transparent")};
    border-radius: 50%;
    z-index: 18;
  }
  @media ${device.mobileL} {
    font-size: 3.5rem;
  }
`;
