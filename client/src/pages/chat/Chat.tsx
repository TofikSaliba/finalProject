import { useState, useEffect, useCallback } from "react";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { useChat } from "../../contexts/Chat.context";
import { usePreferences } from "../../contexts/Preferences.context";
import { StyledChatContainer } from "./StyledChatContainer";
import { StyledRecipent } from "./StyledRecipent";
import avatar from "../../assets/images/avatar.jpg";
import { StyledInputContainer } from "../../components/customInput/styledInputContainer";

function Chat() {
  const [msgText, setMsgText] = useState("");
  const [recipentID, setRecipentID] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const { sendMessage, userMessages, resetUnreadCount, resetInnerUnreadCount } =
    useChat();
  const { setIsLoading, isLoading } = usePreferences();
  const setRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  useEffect(() => {
    if (userMessages?.chat.length! > 0) {
      setRecipentID(userMessages!.chat[currIndex].recipentID);
    }
    resetUnreadCount();
    resetInnerUnreadCount(currIndex);
  }, [userMessages, resetUnreadCount, resetInnerUnreadCount, currIndex]);

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
      const lastMessage =
        idx === userMessages.chat[currIndex].messages.length - 1;
      return (
        <div
          ref={lastMessage ? setRef : null}
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
        <StyledRecipent
          current={currIndex === idx}
          unReadCount={chatObj.unRead}
          onClick={() => handleRecipentClick(idx)}
          key={idx}
        >
          <img src={chatObj.img || avatar} alt="" />
          {chatObj.recipentName}
        </StyledRecipent>
      );
    });
  };

  const handleRecipentClick = (idx: number) => {
    setCurrIndex(idx);
    resetInnerUnreadCount(idx);
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
          <StyledInputContainer>
            <textarea
              id="message"
              onChange={getMsgText}
              value={msgText}
              required
              autoComplete="off"
            />
            <label className={msgText && "filled"} htmlFor="message">
              Message Text
            </label>
          </StyledInputContainer>
          <StyledButton>Send</StyledButton>
        </form>
      </div>
    </StyledChatContainer>
  );
}

export default Chat;
