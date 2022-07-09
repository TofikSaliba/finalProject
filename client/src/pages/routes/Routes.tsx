import { Switch, Route } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";
import About from "../about/About";
import Contact from "../contact/Contact";

// import { useSocket } from "../../contexts/Socket.context";

const Routes = () => {
  // const { socket } = useSocket();

  // const sendMsg = () => {
  //   socket.emit("tofik", { message: "hello world" }, (id: any) => {
  //     console.log(`message sent to ${id} !`);
  //   });
  //   socket.off("receive");
  //   socket.on("receive", (message: string) => {
  //     console.log(message);
  //   });
  // };

  return (
    <>
      <div className="bg-container"></div>
      <NavBar />
      {/* <button onClick={sendMsg}>Click</button> */}

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
