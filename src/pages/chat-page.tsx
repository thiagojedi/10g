import { h, FunctionComponent, Fragment } from "preact";
import { MainLayout } from "../modules/application/main-layout";
import { groupMessagesByUsername } from "../lib/helpers/text";
import { TextAvatar } from "../lib/components/text-avatar";

const ChatMessage: FunctionComponent<{
  username: string;
  content: string[];
}> = (message) => (
  <Fragment>
    <div className="message">
      <div>
        <TextAvatar text={message.username} />
      </div>
      <div>
        <h2>{message.username}</h2>
        {message.content.map((content, i) => (
          <p key={i}>{content}</p>
        ))}
      </div>
    </div>
    <style jsx>
      {`
        .message {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
        }

        p {
          margin-bottom: 0.5rem;
        }
      `}
    </style>
  </Fragment>
);

const ChatPage: FunctionComponent = () => {
  const messages = [
    {
      username: "Oracle",
      content: "I'd ask you to sit down, but, you're not going to anyway",
    },
    {
      username: "Oracle",
      content: "And don't worry about the vase",
    },
    {
      username: "Neo",
      content: "What vase?",
    },
    {
      username: "Oracle",
      content: "That vase",
    },
    {
      username: "Neo",
      content: "I'm sorry...",
    },
    {
      username: "Oracle",
      content: "I said don't worry about it",
    },
    {
      username: "Oracle",
      content: "I'll get one of my kids to fix it",
    },
    {
      username: "Neo",
      content: "How did you know?",
    },
    {
      username: "Oracle",
      content:
        "Ohh, what's really going to bake your noodle later on is, would you still have broken it if I hadn't said anything?",
    },
  ];

  return (
    <MainLayout headerTitle="Oracle">
      <div
        style={{
          overflow: "scroll",
          maxHeight: "100%",
        }}
      >
        {groupMessagesByUsername(messages).map((message, i) => (
          <ChatMessage
            key={i}
            content={message.content}
            username={message.username}
          />
        ))}
      </div>
      <div>
        <input type="text" />
      </div>
      <style jsx>
        {`
          input {
            display: block;
            width: 100%;
            box-sizing: border-box;
            line-height: 3.6rem;
            padding: 0 0.5rem;
            border: 1px solid var(--color-epsilon);
            border-radius: 2px;
          }

          input:focus {
            outline: none;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default ChatPage;
