import { useState, useEffect } from "react";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { useChat } from "../../contexts/Chat.context";
import { usePreferences } from "../../contexts/Preferences.context";
import { StyledChatContainer } from "./StyledChatContainer";
import avatar from "../../assets/images/avatar.jpg";

function Chat() {
  const [msgText, setMsgText] = useState("");
  const [recipentID, setRecipentID] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const { sendMessage, userMessages, resetUnreadCount } = useChat();
  const { setIsLoading, isLoading } = usePreferences();

  useEffect(() => {
    if (userMessages?.chat.length! > 0) {
      setRecipentID(userMessages!.chat[currIndex].recipentID);
    }
    resetUnreadCount();
  }, [userMessages, resetUnreadCount, currIndex]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [setIsLoading]);

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
      return (
        <div
          key={idx}
          className={`textCont ${msgObj.sender ? "sender" : "recipent"}`}
        >
          {msgObj.sender ? <span>{msgObj.time}</span> : ""}
          <div className={`${msgObj.sender ? "text sender" : "text recipent"}`}>
            {msgObj.text}
          </div>{" "}
          {msgObj.sender ? "" : <span>{msgObj.time}</span>}
        </div>
      );
    });
  };

  const getChatRecipentsJSX = () => {
    if (!userMessages || userMessages.chat.length === 0) return;
    return userMessages.chat.map((chatObj, idx) => {
      return (
        <div
          className={`recipent ${currIndex === idx && "current"}`}
          onClick={() => setCurrIndex(idx)}
          key={idx}
        >
          <img src={chatObj.img || avatar} alt="" />
          {chatObj.recipentName}
        </div>
      );
    });
  };

  return isLoading ? (
    <></>
  ) : (
    <StyledChatContainer>
      <div className="recipentsNames">{getChatRecipentsJSX()}</div>
      <div className="chatBoxContainer">
        <div className="chatBox">{getChatMessagesJSX()}</div>
        <hr />
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
