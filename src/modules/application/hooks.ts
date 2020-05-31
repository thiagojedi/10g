import { useEffect, useState } from "preact/hooks";
import { useAirgram } from "./airgram-context";
import { MessageContentUnion } from "@airgram/web";
import { insertAtIndex, sortNumberString } from "../../lib/helpers/collections";

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

  const savedItem = localStorage.getItem(`chat:${chatId}`);
  const [item, setItem] = useState<{ title: string; message: string } | null>(
    !savedItem ? null : JSON.parse(savedItem),
  );
  useEffect(() => {
    localStorage.setItem(`chat:${chatId}`, JSON.stringify(item));
  }, [chatId, item]);

  useEffect(() => {
    const getMessageFromContent = (content?: MessageContentUnion): string => {
      let message: string;
      switch (content?._) {
        case "messageText":
          message = content.text.text;
          break;
        default:
          message = content?._ ?? "";
      }
      return message;
    };

    let canceled = false;
    if (item === null)
      airgram.api.getChat({ chatId }).then(({ response }) => {
        if (canceled) return;
        if (response._ === "chat") {
          const { title, lastMessage } = response;

          setItem({
            title,
            message: getMessageFromContent(lastMessage?.content),
          });
        }
      });

    airgram.on("updateChatLastMessage", ({ update }, next) => {
      if (canceled) return;
      if (update.chatId === chatId)
        setItem(
          (item) =>
            item && {
              ...item,
              message: getMessageFromContent(update.lastMessage?.content),
            },
        );

      return next();
    });
    return () => {
      canceled = true;
    };
  }, [airgram, chatId, item]);

  return item;
};

export const useChatList = () => {
  const airgram = useAirgram();

  const savedPinned = localStorage.getItem("pinned");
  const inicialPinnedMap = new Map<number, string>(
    savedPinned ? JSON.parse(savedPinned) : [],
  );
  const [pinned, setPinned] = useState(inicialPinnedMap);
  useEffect(() => {
    localStorage.setItem("pinned", JSON.stringify([...pinned.entries()]));
  }, [pinned]);

  const savedChats = localStorage.getItem("chatIds");
  const [chats, setChats] = useState<number[]>(
    savedChats ? JSON.parse(savedChats) : [],
  );
  useEffect(() => {
    localStorage.setItem("chatIds", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    const handleUpdate = (
      id: number,
      order: string,
      pinned: boolean,
      next: Function,
    ) => {
      setChats((chats) => {
        const filteredChats = chats.filter((i) => i !== id);

        return pinned
          ? filteredChats
          : insertAtIndex(filteredChats, parseInt(order, 10), id);
      });

      setPinned((chats) => {
        if (!pinned) {
          chats.delete(id);
          return new Map(chats);
        }

        if (pinned && !chats.has(id)) {
          chats.set(id, order);
          return new Map(chats);
        }

        return chats;
      });

      return next();
    };

    airgram.on("updateChatOrder", ({ update: { chatId, order } }, next) => {
      console.log("chat order");
      setChats((chats) => {
        if (!chats.includes(chatId)) return chats;

        const filteredChats = chats.filter((i) => i !== chatId);
        return insertAtIndex(filteredChats, parseInt(order, 10), chatId);
      });

      setPinned((chats) => {
        if (chats.has(chatId)) console.log(`Pinned chat tinha ${chatId}`);
        else console.log(`Pinned chat NÃO tinha ${chatId}`);
        if (!chats.has(chatId)) return chats;

        return new Map(chats.set(chatId, order));
      });

      return next();
    });

    airgram.on(
      "updateNewChat",
      (
        {
          update: {
            chat: { id, order, isPinned },
          },
        },
        next,
      ) => handleUpdate(id, order, isPinned, next),
    );
    airgram.on(
      "updateChatIsPinned",
      ({ update: { chatId, order, isPinned } }, next) =>
        handleUpdate(chatId, order, isPinned, next),
    );

    airgram.on("updateChatLastMessage", ({ update: { chatId, order } }, next) =>
      handleUpdate(chatId, order, false, next),
    );
  }, [airgram]);

  const pinnedIds = orderedIds(pinned).reverse();
  return [...pinnedIds, ...chats];
};

function orderedIds(chats: Map<number, string>) {
  return [...chats.entries()]
    .sort((a, b) => sortNumberString(a[1], b[1]))
    .map(([v]) => v);
}
