import styled from "styled-components";

export const StyledHamburgerMenu = styled.div`
  position: fixed;
  top: 0px;
  right: ${(props) => (props.active ? "0px" : "-260px")};
  width: 250px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: all 750ms ease;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 100%;
  display: flex;
  justify-content: center;
  margin-top: 7rem;
`;
