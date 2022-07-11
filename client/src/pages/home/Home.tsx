import { useRef, useState, useEffect } from "react";
import { useSocket } from "../../contexts/Socket.context";
import { useUser } from "../../contexts/User.context";

interface message {
  msg: string;
}

function Home() {
  const inputRef: any = useRef();
  const IDRef: any = useRef();
  const { sendMessage, socket } = useSocket();
  const { currentUser } = useUser();
  const [msgs, setMsgs] = useState<string[]>([]);
  const [rerender, setRerender] = useState(false);
  const [recipentID, setRecipentID] = useState("");

  const fetch = async () => {
    if (recipentID === "") return;

    let msg = inputRef.current.value;
    setMsgs((prev) => {
      prev.unshift(msg);
      return prev;
    });
    setRerender((prev) => !prev);
    sendMessage(recipentID, inputRef.current.value);
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

  const setID = () => {
    setRecipentID(IDRef.current.value);
    IDRef.current.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="">To ID</label>
      <input ref={IDRef} type="text" />
      <button onClick={setID}>set</button>
      <label htmlFor="">Message</label>
      <input ref={inputRef} type="text" />
      <button onClick={fetch}>send</button>
      <div>{getMsgs()}</div>
    </div>
  );
}

export default Home;
