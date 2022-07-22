import Routes from "./pages/routes/Routes";
import SocketProvider from "./contexts/Socket.context";
import UsersUpdatesProvider from "./contexts/UsersUpdates.context";
import { useUser } from "./contexts/User.context";

import "./App.css";
import ChatProvider from "./contexts/Chat.context";

function App() {
  const { currentUser } = useUser();

  return (
    <SocketProvider user={currentUser ?? null}>
      <ChatProvider>
        <UsersUpdatesProvider>
          <Routes />
        </UsersUpdatesProvider>
      </ChatProvider>
    </SocketProvider>
  );
}

export default App;
