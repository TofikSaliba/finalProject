/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { useChat } from "../../contexts/Chat.context";

function Chat() {
  const inputRef: any = useRef();
  const IDRef: any = useRef();
  const { sendMessage } = useChat();
  const [msgs, setMsgs] = useState<string[]>([]);
  const [recipentID, setRecipentID] = useState("");

  const fetch = async () => {
    if (recipentID === "") return;

    let msg = inputRef.current.value;
    setMsgs((prev) => [msg, ...prev]);
    sendMessage(recipentID, inputRef.current.value);
    inputRef.current.value = "";
  };

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
    <div>
      {/* <label htmlFor="">To ID</label>
      <input ref={IDRef} type="text" />
      <button onClick={setID}>set</button>
      <label htmlFor="">Message</label>
      <input ref={inputRef} type="text" />
      <button onClick={fetch}>send</button>
      <div>{getMsgs()}</div> */}
    </div>
  );
}

export default Chat;
