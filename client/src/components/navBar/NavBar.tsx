import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useUser } from "../../contexts/User.context";
import { useUsersUpdates } from "../../contexts/UsersUpdates.context";
import { usePreferences } from "../../contexts/Preferences.context";
import { useSocket } from "../../contexts/Socket.context";

import serverAPI from "../../api/serverApi";
import { headerOptions, NotificationObject } from "../../types/types";
import { RemoveCookie } from "../../services/jsCookie";

import { StyledHamburgerMenu } from "./styledHamburgerMenu";
import { StyledHamburgerList } from "./styledHamburgerList";
import { StyledHamburgerIcons } from "./styledHamburgerIcons";
import { StyledNotifsContainer } from "./StyledNotifsContainer";
import { StyledButton } from "../styledButton/StyledButton";
import { StyledRequestHelpIcon } from "./StyledRequestHelpIcon";
import MakeRequest from "../../pages/makeRequest/MakeRequest";
import { StyledIcons } from "./StyledIcons";
import { StyledLogo } from "./StyledLogo";
import logoText from "../../assets/images/logoText.png";
import logoIcon from "../../assets/images/marker.svg";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineNotifications } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";

function NavBar() {
  const [requestPopup, setRequestPopup] = useState(false);
  const [displayNotifs, setDisplayNotifs] = useState(false);
  const [responding, setResponding] = useState(false);
  const { currentUser, setCurrentUser, token, setToken } = useUser();
  const { notifications, setNotifications } = useUsersUpdates();
  const { socket } = useSocket();
  const {
    setIsLoading,
    hamburgerOpen,
    setHamburgerOpen,
    toggleHamburger,
    isLoaded,
  } = usePreferences();

  useEffect(() => {
    setResponding(false);
  }, [notifications]);

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
        return responseToOfferingJSX(notObj);
      } else if (notObj.accept !== undefined) {
        if (notObj.accept === "deciding") {
          return decidingToAcceptNotifJSX(notObj);
        } else if (notObj.accept === "yes") {
          return acceptedOfferJSX(notObj);
        } else if (notObj.accept === "no") {
          return declinedOfferJSX(notObj);
        } else {
          return offerMarkerExpiredJSX(notObj);
        }
      } else if (notObj.reviewed !== undefined) {
        return userLeftAReviewJSx(notObj);
      } else {
        return addedMarkerNotifJSX(notObj);
      }
    });
  };

  const responseToOfferingJSX = (notObj: NotificationObject) => {
    const response = notObj.accepted ? "accepted" : "declined";
    const review = notObj.accepted ? " Make sure to leave a review after!" : "";
    return (
      <div key={notObj._id}>
        {`${notObj.name} has ${response} your offer!${review}`}
        <hr />
      </div>
    );
  };

  const decidingToAcceptNotifJSX = (notObj: NotificationObject) => {
    return (
      <div key={notObj._id}>
        {`${notObj.name} is offering to help!`}
        <div className="decidingContainer">
          <StyledButton
            disabled={responding}
            onClick={() => handleResponse("no", notObj)}
          >
            Decline
          </StyledButton>
          <StyledButton
            disabled={responding}
            onClick={() => handleResponse("yes", notObj)}
          >
            Accept
          </StyledButton>
        </div>
        <hr />
      </div>
    );
  };

  const handleResponse = async (res: string, notObj: NotificationObject) => {
    setResponding(true);
    socket.emit("responseToOffer", { res, notObj });
    if (res === "yes") {
      const options: headerOptions = {
        headers: {
          Authorization: token!,
        },
      };
      try {
        await serverAPI(options).delete(
          `/markers/deleteMarker/${notObj.markerID}`
        );
        await serverAPI(options).put("/users/updateUsersToReview", {
          add: true,
          toUser: notObj.userID,
        });
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  const acceptedOfferJSX = (notObj: NotificationObject) => {
    return (
      <div key={notObj._id}>
        {`You have accepted ${notObj.name}'s offer! Make sure you leave a review after`}
        <hr />
      </div>
    );
  };

  const declinedOfferJSX = (notObj: NotificationObject) => {
    return (
      <div key={notObj._id}>
        {`You have declined ${notObj.name}'s offer!`}
        <hr />
      </div>
    );
  };

  const offerMarkerExpiredJSX = (notObj: NotificationObject) => {
    return (
      <div key={notObj._id}>
        {`${notObj.name} offered to help, but request has expired!`}
        <hr />
      </div>
    );
  };

  const userLeftAReviewJSx = (notObj: NotificationObject) => {
    return (
      <div key={notObj._id}>
        {`${notObj.name} has posted a review about you! check profile!`}
        <hr />
      </div>
    );
  };

  const addedMarkerNotifJSX = (notObj: NotificationObject) => {
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
