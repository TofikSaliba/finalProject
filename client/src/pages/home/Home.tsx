import { useRef, useState, useEffect } from "react";
import { useSocket } from "../../contexts/Socket.context";
import { useUser } from "../../contexts/User.context";

function Home() {
  const inputRef: any = useRef();
  const { sendMessage, socket } = useSocket();
  const { currentUser } = useUser();
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    const to =
      currentUser?._id === "62cae0339561dbdfaf1064d2"
        ? "62c8b45b7f653b187994072f"
        : "62cae0339561dbdfaf1064d2";
    sendMessage(to, `${inputRef.current.value} from: `);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (socket) {
      // socket.off("receiveMessage");
      socket.on("receiveMessage", ({ msg }: any) => {
        setMsg(msg);
      });
      return () => socket.off("receiveMessage");
    }
  }, [socket]);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={fetch}>fetch</button>
      <div>{msg}</div>
    </div>
  );
}

export default Home;
