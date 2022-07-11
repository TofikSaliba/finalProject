import { Switch, Route } from "react-router-dom";
import Lottie from "lottie-react";
import helpSpinner from "../../lottie/help-animation.json";
import NavBar from "../../components/navBar/NavBar";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import Map from "../map/Map";
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";
import About from "../about/About";
import Contact from "../contact/Contact";
import { usePreferences } from "../../contexts/Preferences.context";

const Routes = () => {
  const { isLoading } = usePreferences();

  return (
    <>
      <div className="bg-container"></div>
      <NavBar />
      {/* <button onClick={sendMsg}>Click</button> */}
      {isLoading && (
        <Lottie className="lottieSpinner" animationData={helpSpinner} loop />
      )}
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Profile} path="/profile/:id?" />
        <Route exact component={Map} path="/map" />
        <Route exact component={Contact} path="/contact" />
        <Route exact component={About} path="/about" />
        <Route exact component={SignUp} path="/signUp" />
        <Route exact component={Login} path="/login" />
      </Switch>
    </>
  );
};

export default Routes;
