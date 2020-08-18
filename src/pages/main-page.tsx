import { h } from "preact";
import { MainLayout } from "../modules/application/main-layout";
import { ContactList } from "../modules/chat/contact-list";

import { useChatList } from "../modules/application/hooks";
import { useAirgram } from "../modules/application/airgram-context";

const MainPage = () => {
  const chatIds = useChatList();

  const airgram = useAirgram();

  return (
    <MainLayout
      headerTitle="Ten Grams"
      actions={{
        left: {
          label: "Logout",
          action: () => airgram.api.logOut(),
        },
      }}
    >
      <ContactList contactList={chatIds} />
    </MainLayout>
  );
};

export default MainPage;
