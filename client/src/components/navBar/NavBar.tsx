import { useState } from "react";
import { NavLink } from "react-router-dom";
import { StyledHamburgerMenu } from "./styledHamburgerMenu";
import { StyledHamburgerList } from "./styledHamburgerList";
import { StyledHamburgerIcons } from "./styledHamburgerIcons";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

function NavBar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  return (
    <>
      <StyledHamburgerIcons onClick={() => setHamburgerOpen((prev) => !prev)}>
        {hamburgerOpen ? <AiOutlineClose /> : <FiMenu />}
      </StyledHamburgerIcons>
      <StyledHamburgerMenu active={hamburgerOpen}>
        <StyledHamburgerList onClick={() => setHamburgerOpen((prev) => !prev)}>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/profile">
            <li>Profile</li>
          </NavLink>

          <NavLink to="/about">
            <li>About</li>
          </NavLink>

          <NavLink to="/contact">
            <li>Contact</li>
          </NavLink>

          <NavLink to="/signUp">
            <li>signUp</li>
          </NavLink>

          <NavLink to="/login">
            <li>Login</li>
          </NavLink>
        </StyledHamburgerList>
      </StyledHamburgerMenu>
    </>
  );
}

export default NavBar;
