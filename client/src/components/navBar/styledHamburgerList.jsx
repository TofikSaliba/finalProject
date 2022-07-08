import styled from "styled-components";

export const StyledHamburgerList = styled.ul`
  list-style-type: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: min-content;
  height: min-content;
  a {
    padding: 1.5rem;
    text-decoration: none;
    border-radius: 5px;
    color: #111;
    font-weight: bold;
    transition: all 0.5s ease;
    font-size: 2rem;
    width: min-content;
  }
  a:hover {
    background: rgb(226, 226, 178);
    color: #fff;
  }
`;
