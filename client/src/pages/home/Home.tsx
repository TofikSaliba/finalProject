import { useRef, useState, useEffect } from "react";
import { useSocket } from "../../contexts/Socket.context";
import { useUser } from "../../contexts/User.context";

interface message {
  msg: string;
}

function Home() {
  const inputRef: any = useRef();
  const { sendMessage, socket } = useSocket();
  const { currentUser } = useUser();
  const [msgs, setMsgs] = useState<string[]>([]);
  const [rerender, setRerender] = useState(false);

  const fetch = async () => {
    const to =
      currentUser?._id === "62cae0339561dbdfaf1064d2"
        ? "62c8b45b7f653b187994072f"
        : "62cae0339561dbdfaf1064d2";

    let msg = inputRef.current.value;
    setMsgs((prev) => {
      prev.unshift(msg);
      return prev;
    });
    setRerender((prev) => !prev);
    sendMessage(to, inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", ({ msg }: message) => {
        setMsgs((prev) => [msg, ...prev]);
      });
      return () => socket.off("receiveMessage");
    }
  }, [socket]);

  const getMsgs = () => {
    return msgs.map((msg, idx) => {
      return <div key={idx}>{msg}</div>;
    });
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={fetch}>fetch</button>
      <div>{getMsgs()}</div>
    </div>
  );
}

export default Home;
