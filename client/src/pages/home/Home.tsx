import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { usePreferences } from "../../contexts/Preferences.context";
import { useUser } from "../../contexts/User.context";
import { StyledHome } from "./StyledHome";

function Home() {
  const { setIsLoading, setRequestPopup, isLoading } = usePreferences();
  const { currentUser } = useUser();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, [setIsLoading]);

  return !isLoading ? (
    <StyledHome>
      <h1>Helping Hand</h1>
      <p>
        Hey There! Are you looking for help ? This is the right website for you!
        No? Are you looking to help ? Well this is still the right place for you
        😃 take a look at the About page!
      </p>
      <NavLink to="/about">
        <StyledButton>About</StyledButton>
      </NavLink>
      {!currentUser && (
        <>
          <p>
            Make sure you create an account, notice that we have two types of
            accounts, make one according to the role you want to do!
          </p>
          <NavLink to="/signUp">
            <StyledButton>SignUp</StyledButton>
          </NavLink>
          <p>
            Already have an account?{" "}
            <NavLink to="/login">
              <StyledButton>Login</StyledButton>
            </NavLink>
          </p>
        </>
      )}
      {currentUser && currentUser.helper && (
        <>
          <h2> Welcome {currentUser.name}</h2>
          <p>
            We are so glad that you decided to help! Check the map to find those
            who need it!
          </p>
          <NavLink to="/map">
            <StyledButton>Map</StyledButton>
          </NavLink>
        </>
      )}
      {currentUser && !currentUser.helper && (
        <>
          <h2> Welcome {currentUser.name}</h2>
          <p>
            We are so glad that you have chosen us to find people around you
            that are able to help! make a help request so people see it on the
            map! click the plus(+) symbol at the bottom right of your screen! or
            this button:
          </p>

          <StyledButton onClick={() => setRequestPopup(true)}>
            Make Request
          </StyledButton>
        </>
      )}
      <h2>Contact</h2>
      <p>
        Make sure you contact us with any questions, bug reports or
        improvements! Feedback is always welcome!
      </p>
      <NavLink to="/contact">
        <StyledButton>Contact</StyledButton>
      </NavLink>
    </StyledHome>
  ) : (
    <></>
  );
}

export default Home;
