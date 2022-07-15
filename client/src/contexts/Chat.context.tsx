import React, { useState, useEffect, useContext } from "react";
import { contextsProviderProps, ChatObj, Msg } from "../types/types";
import { useSocket } from "./Socket.context";

interface ChatContextValue {
  userMessages: ChatObj | {};
  sendMessage: (to: string, message: string) => void;
}

const emptyChatContextValue: ChatContextValue = {
  userMessages: {},
  sendMessage: function (): void {},
};

const ChatContext = React.createContext<ChatContextValue>(
  emptyChatContextValue
);

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }: contextsProviderProps) {
  const [userMessages, setUserMessages] = useState<ChatObj | {}>({});
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", ({ msg }: Msg) => {
        setUserMessages((prev: any) => ({ ...prev }));
      });
      return () => socket.off("receiveMessage");
    }
  }, [socket]);

  const sendMessage = (to: string, message: string) => {
    socket.emit("sendMessage", { to, message });
  };

  const value: ChatContextValue = {
    userMessages,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
