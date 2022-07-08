import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./contexts/User.context";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
