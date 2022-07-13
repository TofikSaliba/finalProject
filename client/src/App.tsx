import Routes from "./pages/routes/Routes";
import SocketProvider from "./contexts/Socket.context";
import UsersUpdatesProvider from "./contexts/UsersUpdates.context";
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
    <SocketProvider user={currentUser ?? null}>
      <UsersUpdatesProvider>
        <div onClick={closeMenu} id="main" className="mainContainer">
          <Routes />
        </div>
      </UsersUpdatesProvider>
    </SocketProvider>
  );
}

export default App;
