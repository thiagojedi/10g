import { useEffect, useState } from "preact/hooks";
import { useAirgram } from "./airgram-context";
import { Chat } from "@airgram/web";

export const useLoggedState = () => {
  const [logged, setLogged] = useState(false);

  const airgram = useAirgram();
  airgram.on("updateAuthorizationState", async ({ update }, next) => {
    const currentState = update.authorizationState._;

    console.log(currentState);
    switch (currentState) {
      case "authorizationStateReady":
        setLogged(true);
        break;
      case "authorizationStateWaitPhoneNumber":
        await airgram.api.setAuthenticationPhoneNumber({
          phoneNumber: prompt("Phone number")!,
        });
        break;
      case "authorizationStateWaitCode":
        await airgram.api.checkAuthenticationCode({
          code: prompt("Received code")!,
        });
        break;
      case "authorizationStateLoggingOut":
      case "authorizationStateClosed":
      case "authorizationStateClosing":
        setLogged(false);
        break;
    }
    return next();
  });
  return logged;
};

export const useChat = (chatId: number) => {
  const airgram = useAirgram();

  const [item, setItem] = useState<Chat | null>(null);
  useEffect(() => {
    airgram.api.getChat({ chatId }).then(({ response }) => {
      if (response._ === "error") {
        console.error(response.message);
        return;
      }
      setItem(response);
    });
  }, []);

  useEffect(() => {
    airgram.on("updateChatLastMessage", ({ update }, next) => {
      if (update.chatId === chatId)
        setItem((item) => item && { ...item, lastMessage: update.lastMessage });

      return next();
    });
  }, [chatId]);

  if (item === null) return null;

  const { title, lastMessage } = item;

  let message = "";
  const content = lastMessage?.content;
  switch (content?._) {
    case "messageText":
      message = content.text.text;
      break;
  }

  return { title, message };
};

export const useChatList = () => {
  const [chats, setChats] = useState(new Map<number, number>([]));

  const airgram = useAirgram();
  useEffect(() => {
    airgram.api
      .getChats({
        offsetOrder: "9223372036854775807",
        limit: 30,
      })
      .then(({ response }) => {
        if (response._ === "chats")
          setChats(new Map(response.chatIds.entries()));
      });

    airgram.on("updateChatOrder", ({ update }, next) => {
      setChats((chats) => {
        chats.set(parseInt(update.order, 10), update.chatId);
        return new Map([...chats.entries()].sort((a, b) => a[0] - b[0]));
      });
      return next();
    });
  }, []);

  return Array.from(chats.values());
};
