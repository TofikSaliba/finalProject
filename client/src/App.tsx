import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/Home";
import "./App.css";

const socket = io("http://localhost:5000");

socket.on("receive", (message: string) => {
  console.log(message);
});

function App() {
  useEffect(() => {
    socket.emit("giveId", { newId: (Math.random() * 10) | 0 });
  }, []);

  const sendMsg = () => {
    socket.emit("tofik", { message: "hello world" }, () => {
      console.log("message sent !");
    });
  };

  return (
    <>
      <Router>
        welcome
        <button onClick={sendMsg}>Click</button>
        {/* <Header /> */}
        <div className="mainContainer">
          {/* {isSpinning && <h1 className="spinner">Loading</h1>} */}
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} /> */}
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
