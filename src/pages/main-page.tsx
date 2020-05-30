import { h } from "preact";
import { MainLayout } from "../modules/application/main-layout";
import { ContactList } from "../modules/chat/contact-list";

import { useChatList } from "../modules/application/hooks";

const MainPage = () => {
  const chatIds = useChatList();

  return (
    <MainLayout headerTitle="Ten Grams" actions>
      <ContactList contactList={chatIds} />
    </MainLayout>
  );
};

export default MainPage;
