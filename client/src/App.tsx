import Routes from "./pages/routes/Routes";
import SocketProvider from "./contexts/Socket.context";
import { useUser } from "./contexts/User.context";

import "./App.css";

function App() {
  const { currentUser } = useUser();

  return (
    <div className="mainContainer">
      <SocketProvider id={currentUser && currentUser._id}>
        <Routes />
      </SocketProvider>
    </div>
  );
}

export default App;
