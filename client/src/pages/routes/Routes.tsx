// import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";
// import userApi from "../../apis/userApi";
import About from "../about/About";
import Contact from "../contact/Contact";

const Routes = () => {
  return (
    <>
      <div className="bg-container"></div>
      <NavBar />
      {/* {isSpinning && <h1 className="spinner">Loading</h1>} */}
      <Switch>
        <Route exact component={Home} path="/"></Route>
        <Route exact component={Profile} path="/profile"></Route>
        <Route exact component={Contact} path="/contact" />
        <Route exact component={About} path="/about" />
        <Route exact component={SignUp} path="/signUp"></Route>
        <Route exact component={Login} path="/login" />
      </Switch>
    </>
  );
};

export default Routes;
