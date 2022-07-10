import { useRef, useState } from "react";
import { useSocket } from "../../contexts/Socket.context";

function Home() {
  const inputRef: any = useRef();
  const { sendMessage, socket } = useSocket();
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    sendMessage("62cae0339561dbdfaf1064d2", `${inputRef.current.value} from: `);
    inputRef.current.value = "";
  };

  const getMessage = () => {
    if (!socket) return;
    socket.off("receiveMessage");
    socket.on("receiveMessage", ({ msg }: any) => {
      setMsg(msg);
    });
  };

  getMessage();

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={fetch}>fetch</button>
      <div>{msg}</div>
    </div>
  );
}

export default Home;
