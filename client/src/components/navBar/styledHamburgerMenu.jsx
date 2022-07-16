import styled from "styled-components";

export const StyledHamburgerMenu = styled.div`
  position: fixed;
  top: 0px;
  left: ${(props) => (props.active ? "0px" : "-260px")};
  width: 250px;
  height: 100%;
  background-color: #37b804;
  z-index: 18;
  transition: all 750ms ease;
  border-top-right-radius: 5%;
  border-bottom-right-radius: 100%;
  display: flex;
  justify-content: center;
  margin-top: 7rem;
`;
