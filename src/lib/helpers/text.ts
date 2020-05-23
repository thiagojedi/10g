export function getInitials(fullName?: string): string {
  if (fullName === undefined) return "?";

  const allNames = fullName.split(" ");

  const firstName = allNames.shift();
  const lastName = allNames.pop();

  return [firstName, lastName]
    .map((n) => n && n.codePointAt(0))
    .map((n) => n && String.fromCodePoint(n))
    .join("");
}

type Message<T> = { username: string; content: T };
type MessageGroup<T> = { username: string; content: T[] };

export const groupMessagesByUsername = <T>(
  messages: Array<Message<T>>,
): Array<MessageGroup<T>> => {
  return messages
    .map((message) => ({ ...message, content: [message.content] }))
    .reduce((prev, curr) => {
      const lastMessage = prev.pop();

      if (lastMessage === undefined) return [curr];

      if (lastMessage.username === curr.username) {
        lastMessage.content = [...lastMessage.content, ...curr.content];
        return [...prev, lastMessage];
      }

      return [...prev, lastMessage, curr];
    }, [] as Array<MessageGroup<T>>);
};
