import React, { useState, useEffect, useContext } from "react";
import {
  contextsProviderProps,
  ChatObj,
  Msg,
  headerOptions,
} from "../types/types";
import { useSocket } from "./Socket.context";
import { useUser } from "./User.context";
import serverAPI from "../api/serverApi";

interface ChatContextValue {
  userMessages: ChatObj | undefined;
  sendMessage: (to: string, message: string, currIndex: number) => void;
}

const emptyChatContextValue: ChatContextValue = {
  userMessages: undefined,
  sendMessage: function (): void {},
};

const ChatContext = React.createContext<ChatContextValue>(
  emptyChatContextValue
);

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }: contextsProviderProps) {
  const [userMessages, setUserMessages] = useState<ChatObj>();
  const { socket } = useSocket();
  const { currentUser, token } = useUser();

  useEffect(() => {
    if (currentUser) {
      (async function () {
        const options: headerOptions = {
          headers: {
            Authorization: token!,
          },
        };
        try {
          const { data } = await serverAPI(options).get(
            "/chat/getUserMessages"
          );
          setUserMessages(data.userChat);
        } catch (err: any) {
          console.log(err.message);
        }
      })();
    }
  }, [currentUser, token]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", async ({ msg }: Msg) => {
        const options: headerOptions = {
          headers: {
            Authorization: token!,
          },
        };
        try {
          const { data } = await serverAPI(options).get(
            "/chat/getUserMessages"
          );
          console.log(data);

          setUserMessages(data.userChat);
        } catch (err: any) {
          console.log(err.message);
        }
      });
      return () => socket.off("receiveMessage");
    }
  }, [socket, token]);

  const sendMessage = (to: string, message: string, currIndex: number) => {
    setUserMessages((prev) => {
      prev?.chat[currIndex].messages.push({ text: message, sender: true });
      return prev;
    });
    socket.emit("sendMessage", { to, message });
  };

  const value: ChatContextValue = {
    userMessages,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
