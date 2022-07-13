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
import { BsChatDots } from "react-icons/bs";
import serverAPI from "../../api/serverApi";
import { headerOptions, NotificationObject } from "../../types/types";
import { RemoveCookie } from "../../services/jsCookie";
import { usePreferences } from "../../contexts/Preferences.context";
import { StyledRequestHelpIcon } from "./StyledRequestHelpIcon";
import MakeRequest from "../../pages/makeRequest/MakeRequest";
import { StyledIcons } from "./StyledIcons";
import { StyledLogo } from "./StyledLogo";
import logoText from "../../assets/images/logoText.png";
import logoIcon from "../../assets/images/marker.svg";
import { useUsersUpdates } from "../../contexts/UsersUpdates.context";
import { StyledNotifsContainer } from "./StyledNotifsContainer";
import { StyledButton } from "../styledButton/StyledButton";

function NavBar() {
  const [requestPopup, setRequestPopup] = useState(false);
  const [displayNotifs, setDisplayNotifs] = useState(false);
  const { currentUser, setCurrentUser, token, setToken } = useUser();
  const { notifications, setNotifications } = useUsersUpdates();
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

  const getNotificationsJSX = () => {
    return notifications?.notifications.map((notObj) => {
      if (notObj.accepted !== undefined) {
        const response = notObj.accepted ? "accepted" : "declined";
        return (
          <div key={notObj._id}>
            {`${notObj.name} has ${response} your offer! Make sure to leave a review after!`}
            <hr />
          </div>
        );
      } else if (notObj.accept !== undefined) {
        if (notObj.accept === "deciding") {
          return (
            <div key={notObj._id}>
              {`${notObj.name} is offering to help!`}
              <div>
                <StyledButton>Decline</StyledButton>
                <StyledButton>Accept</StyledButton>
              </div>
              <hr />
            </div>
          );
        } else if (notObj.accept === "yes") {
          return (
            <div key={notObj._id}>
              {`You have accepted ${notObj.name}'s offer! Make sure you leave a review after`}
              <hr />
            </div>
          );
        }
        return (
          <div key={notObj._id}>
            {`You have declined ${notObj.name}'s offer!`}
            <hr />
          </div>
        );
      } else if (notObj.reviewed !== undefined) {
        return (
          <div key={notObj._id}>
            {`${notObj.name} has posted a review about you! check profile!`}
            <hr />
          </div>
        );
      } else {
        return addedMarkerJSX(notObj);
      }
    });
  };

  const addedMarkerJSX = (notObj: NotificationObject) => {
    return (
      <div key={notObj._id}>
        <span>{notObj.name}</span> is requesting help, check the map!
        <hr />
      </div>
    );
  };

  const handleNotifClick = async () => {
    setDisplayNotifs((prev) => !prev);
    if (notifications!.unRead > 0) {
      const options: headerOptions = {
        headers: {
          Authorization: token!,
        },
      };
      try {
        setNotifications((prev: any) => ({ ...prev, unRead: 0 }));
        await serverAPI(options).put("/notifications/updateUnRead");
      } catch (err: any) {
        console.log(err.message);
      }
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
        <StyledIcons notCount={notifications?.unRead} msgCount={4}>
          <MdOutlineNotifications className="icon" onClick={handleNotifClick} />
          {displayNotifs && (
            <StyledNotifsContainer>
              {getNotificationsJSX()}
            </StyledNotifsContainer>
          )}
          <NavLink to="/chat">
            <BsChatDots className="icon" />
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
