import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

import { ListItem } from "../../lib/components/list-item";
import { useChat } from "../application/hooks";

type ContactListProps = {
  contactList: number[];
  onFocusChanged?: (index: number) => void;
};

const ContactListItem: FunctionComponent<{
  chatId: number;
  focused: boolean;
}> = ({ chatId, focused = false }) => {
  const chat = useChat(chatId);
  if (chat === null) return null;

  const { title, message } = chat;
  return (
    <ListItem
      primaryText={title}
      tertiaryText={message?.slice(0, 12)}
      focused={focused}
    />
  );
};

export const ContactList: FunctionComponent<ContactListProps> = ({
  contactList,
  onFocusChanged,
}) => {
  const [focusIndex, setFocus] = useState(0);
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
          setFocus((focus) => {
            const newFocus = Math.max(0, focus - 1);
            return newFocus;
          });
          break;
        case "ArrowDown":
        case "ArrowRight":
          setFocus((focus) => Math.min(contactList.length - 1, focus + 1));
          break;
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [contactList.length]);

  useEffect(() => {
    if (onFocusChanged !== undefined) onFocusChanged(focusIndex);
  }, [onFocusChanged, focusIndex]);

  return (
    <div>
      {contactList.map((item, i) => (
        <ContactListItem key={i} chatId={item} focused={i == focusIndex} />
      ))}
    </div>
  );
};
