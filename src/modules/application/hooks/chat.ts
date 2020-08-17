import { useAirgram } from "../airgram-context";
import { useEffect, useState } from "preact/hooks";
import { MessageContentUnion } from "@airgram/web";
import { sortNumberString } from "../../../lib/helpers/collections";

interface ChatState {
  title: string;
  message: string;
}

export const useChat = (chatId: number) => {
  const airgram = useAirgram();

  const [item, setItem] = useState<ChatState | null>(() => {
    const savedItem = localStorage.getItem(`chat:${chatId}`);
    return !savedItem ? null : JSON.parse(savedItem);
  });

  useEffect(() => {
    localStorage.setItem(`chat:${chatId}`, JSON.stringify(item));
  }, [chatId, item]);

  useEffect(() => {
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

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return new Map<number, string>(savedChats ? JSON.parse(savedChats) : []);
  });
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify([...chats.entries()]));
  }, [chats]);

  useEffect(() => {
    const handleUpdate = (id: number, order: string, next: Function) => {
      setChats((chats) =>
        order === "0" ? chats : new Map(chats.set(id, order)),
      );

      return next();
    };

    airgram.on("updateChatOrder", ({ update: { chatId, order } }, next) =>
      handleUpdate(chatId, order, next),
    );

    airgram.on("updateNewChat", ({ update: { chat: { id, order } } }, next) =>
      handleUpdate(id, order, next),
    );

    airgram.on("updateChatIsPinned", ({ update: { chatId, order } }, next) =>
      handleUpdate(chatId, order, next),
    );

    airgram.on(
      "updateChatLastMessage",
      ({ update: { chatId, order } }, next) => {
        handleUpdate(chatId, order, next);
      },
    );
  }, [airgram]);

  return orderedIds(chats).reverse();
};

function orderedIds(chats: Map<number, string>) {
  return [...chats.entries()]
    .sort((a, b) => sortNumberString(a[1], b[1]))
    .map(([v]) => v);
}

function getMessageFromContent(content?: MessageContentUnion): string {
  let message: string;
  switch (content?._) {
    case "messageText":
      message = content.text.text;
      break;
    default:
      message = content?._ ?? "";
  }
  return message;
}
