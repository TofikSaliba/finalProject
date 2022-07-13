import Routes from "./pages/routes/Routes";
import SocketProvider from "./contexts/Socket.context";
import MarkersAndChatProvider from "./contexts/MarkersAndChat.context";
import { useUser } from "./contexts/User.context";
import { usePreferences } from "./contexts/Preferences.context";

import "./App.css";

function App() {
  const { currentUser } = useUser();
  const { setHamburgerOpen, hamburgerOpen } = usePreferences();

  const closeMenu = (e: any) => {
    if (
      e.target.id !== "burgerIcon" &&
      e.target.id !== "burgerMenu" &&
      hamburgerOpen
    )
      setHamburgerOpen(false);
  };

  return (
    <SocketProvider id={currentUser && currentUser._id}>
      <MarkersAndChatProvider>
        <div onClick={closeMenu} id="main" className="mainContainer">
          <Routes />
        </div>
      </MarkersAndChatProvider>
    </SocketProvider>
  );
}

export default App;
