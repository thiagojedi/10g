import { h, FunctionComponent, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

import { ListItem } from "../../lib/components/list-item";

type ContactListProps = {
  contactList: Array<{
    title: string;
  }>;
  onFocusChanged?: (index: number) => void;
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
    <Fragment>
      <div className="contact-list">
        {contactList.map((item, i) => (
          <ListItem
            key={i}
            primaryText={item.title}
            focused={i == focusIndex}
          />
        ))}
      </div>
      <style jsx>{`
        .contact-list {
          overflow: scroll;
          max-height: 100%;
        }
      `}</style>
    </Fragment>
  );
};
