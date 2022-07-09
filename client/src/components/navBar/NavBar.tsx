import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/User.context";
import { StyledHamburgerMenu } from "./styledHamburgerMenu";
import { StyledHamburgerList } from "./styledHamburgerList";
import { StyledHamburgerIcons } from "./styledHamburgerIcons";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import serverAPI from "../../api/serverApi";
import { headerOptions } from "../../types/types";
import { RemoveCookie } from "../../services/jsCookie";
import { usePreferences } from "../../contexts/Preferences.context";

function NavBar() {
  const { currentUser, setCurrentUser, token, setToken } = useUser();
  const { setIsLoading, hamburgerOpen, setHamburgerOpen } = usePreferences();

  const logOut = async () => {
    const options: headerOptions = {
      headers: {
        Authorization: token!,
      },
    };
    setIsLoading(true);
    try {
      await serverAPI(options).post("/users/logout");
      setToken(null);
      RemoveCookie("userToken");
      setCurrentUser(null);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StyledHamburgerIcons
        onClick={() => setHamburgerOpen((prev: boolean) => !prev)}
      >
        {hamburgerOpen ? <AiOutlineClose /> : <FiMenu />}
      </StyledHamburgerIcons>
      <StyledHamburgerMenu active={hamburgerOpen}>
        <StyledHamburgerList onClick={() => setHamburgerOpen(false)}>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          {currentUser && (
            <NavLink to="/profile">
              <li>Profile</li>
            </NavLink>
          )}

          <NavLink to="/about">
            <li>About</li>
          </NavLink>

          <NavLink to="/contact">
            <li>Contact</li>
          </NavLink>

          {!currentUser && (
            <>
              <NavLink to="/signUp">
                <li>SignUp</li>
              </NavLink>

              <NavLink to="/login">
                <li>Login</li>
              </NavLink>
            </>
          )}
          {currentUser && (
            <NavLink onClick={logOut} to="/">
              <li>Logout</li>
            </NavLink>
          )}
        </StyledHamburgerList>
      </StyledHamburgerMenu>
    </>
  );
}

export default NavBar;
