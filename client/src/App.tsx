import { useEffect } from "react";
import Routes from "./pages/routes/Routes";

import io from "socket.io-client";
import userApi from "./api/userApi";
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

  const getData = async () => {
    const options = {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM4Mjk5MmVmN2FhOWYyNWQzMGVjMjkiLCJpYXQiOjE2NTcyODUwMTAsImV4cCI6MTY1Nzg4OTgxMH0.eeGDKYiBnZa0kVZCARfgmNng7t52VbXQEqohMAzCqQI",
      },
    };
    const { data } = await userApi(options).get("/profile");
    console.log(data);
  };

  return (
    <div className="mainContainer">
      <button onClick={sendMsg}>Click</button>
      <button onClick={getData}>get</button>
      <Routes />
    </div>
  );
}

export default App;
