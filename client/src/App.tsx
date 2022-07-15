import Routes from "./pages/routes/Routes";
import SocketProvider from "./contexts/Socket.context";
import UsersUpdatesProvider from "./contexts/UsersUpdates.context";
import { useUser } from "./contexts/User.context";
import { usePreferences } from "./contexts/Preferences.context";

import "./App.css";
import ChatProvider from "./contexts/Chat.context";

function App() {
  const { currentUser } = useUser();
  const { setHamburgerOpen, hamburgerOpen, setDisplayNotifs } =
    usePreferences();

  const closeMenu = (e: any) => {
    if (
      e.target.id !== "burgerIcon" &&
      e.target.id !== "burgerMenu" &&
      hamburgerOpen
    ) {
      setHamburgerOpen(false);
    }
    if (e.target.id === "main") {
      setDisplayNotifs(false);
    }
  };

  return (
    <SocketProvider user={currentUser ?? null}>
      <ChatProvider>
        <UsersUpdatesProvider>
          <div onClick={closeMenu} id="main" className="mainContainer">
            <Routes />
          </div>
        </UsersUpdatesProvider>
      </ChatProvider>
    </SocketProvider>
  );
}

export default App;
