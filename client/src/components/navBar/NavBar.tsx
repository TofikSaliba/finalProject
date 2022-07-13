import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/User.context";
import { StyledHamburgerMenu } from "./styledHamburgerMenu";
import { StyledHamburgerList } from "./styledHamburgerList";
import { StyledHamburgerIcons } from "./styledHamburgerIcons";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineNotifications } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import serverAPI from "../../api/serverApi";
import { headerOptions } from "../../types/types";
import { RemoveCookie } from "../../services/jsCookie";
import { usePreferences } from "../../contexts/Preferences.context";
import { StyledRequestHelpIcon } from "./StyledRequestHelpIcon";
import MakeRequest from "../../pages/makeRequest/MakeRequest";
import { StyledIcons } from "./StyledIcons";
import { StyledLogo } from "./StyledLogo";
import logoText from "../../assets/images/logoText.png";
import logoIcon from "../../assets/images/marker.svg";

function NavBar() {
  const [requestPopup, setRequestPopup] = useState(false);
  const { currentUser, setCurrentUser, token, setToken } = useUser();
  const {
    setIsLoading,
    hamburgerOpen,
    setHamburgerOpen,
    toggleHamburger,
    isLoaded,
  } = usePreferences();

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
      <NavLink to="/">
        <StyledLogo>
          <img src={logoText} id="logoText" alt="text" />
          <img src={logoIcon} alt="icon" />
        </StyledLogo>
      </NavLink>
      <StyledHamburgerIcons id="burgerIcon" onClick={toggleHamburger}>
        {hamburgerOpen ? <AiOutlineClose /> : <FiMenu />}
      </StyledHamburgerIcons>
      <StyledHamburgerMenu id="burgerMenu" active={hamburgerOpen}>
        <StyledHamburgerList onClick={() => setHamburgerOpen(false)}>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          {currentUser && (
            <NavLink to="/profile">
              <li>Profile</li>
            </NavLink>
          )}
          {currentUser && currentUser.helper && (
            <NavLink to="/map">
              <li>Map</li>
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
      {currentUser && (
        <StyledIcons>
          <MdOutlineNotifications />
          <NavLink to="/chat">
            <BsFillChatDotsFill className="icon" />
          </NavLink>
        </StyledIcons>
      )}
      {currentUser && !currentUser.helper && (
        <StyledRequestHelpIcon>
          {isLoaded && (
            <GrAddCircle onClick={() => setRequestPopup((prev) => !prev)} />
          )}
        </StyledRequestHelpIcon>
      )}
      {requestPopup && <MakeRequest close={setRequestPopup} />}
    </>
  );
}

export default NavBar;
