/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { useChat } from "../../contexts/Chat.context";
import { usePreferences } from "../../contexts/Preferences.context";
import { StyledChatContainer } from "./StyledChatContainer";

function Chat() {
  const [msgText, setMsgText] = useState("");
  const [recipentID, setRecipentID] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const { sendMessage, userMessages } = useChat();
  const { setIsLoading, isLoading } = usePreferences();

  useEffect(() => {
    if (userMessages?.chat.length! > 0) {
      setRecipentID(userMessages!.chat[0].recipentID);
    }
  }, [userMessages]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  //   const getMsgs = () => {
  //     return msgs.map((msg, idx) => {
  //       return <div key={idx}>{msg}</div>;
  //     });
  //   };

  //   const setID = () => {
  //     setRecipentID(IDRef.current.value);
  //     IDRef.current.value = "";
  //   };

  const getMsgText = (e: any) => {
    setMsgText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (msgText === "") return;
    sendMessage(recipentID, msgText, currIndex);
    setMsgText("");
  };

  const getChatMessagesJSX = () => {
    if (!userMessages || userMessages.chat.length === 0) return;
    return userMessages.chat[currIndex].messages.map((msgObj, idx) => {
      return <div key={idx}>{msgObj.text}</div>;
    });
  };

  return isLoading ? (
    <></>
  ) : (
    <StyledChatContainer>
      <div className="recipentsNames">
        <ul>
          <li>one ha</li>
          <li>one ha</li>
          <li>one ha</li>
          <li>one ha</li>
          <li>one ha</li>
        </ul>
      </div>
      <div className="chatBox">
        {getChatMessagesJSX()}
        <form onSubmit={handleSubmit}>
          <CustomInput
            id={"chatMsg"}
            onChange={getMsgText}
            type="text"
            value={msgText}
            inputLabel="Message Text"
            required={true}
          />
          <StyledButton>Send</StyledButton>
        </form>
      </div>
    </StyledChatContainer>
  );
}

export default Chat;
