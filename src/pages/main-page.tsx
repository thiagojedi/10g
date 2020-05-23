import { h } from "preact";
import { MainLayout } from "../modules/application/main-layout";
import { ContactList } from "../modules/chat/contact-list";

const MainPage = () => {
  const contactList = [
    {
      title: "Mr Anderson",
      status: "online",
    },
    {
      title: "Morpheus",
      status: "offline",
    },
    {
      title: "Agent Smith",
      status: "online",
    },
    {
      title: "Trinity",
      status: "dead",
    },
    {
      title: "Lana Watchovisk",
      status: "other",
    },
  ];

  const handleFocus = (focus: number) => console.log("Focus changed: " + focus);

  return (
    <MainLayout headerTitle="Ten Grams" actions>
      <ContactList contactList={contactList} onFocusChanged={handleFocus} />
    </MainLayout>
  );
};

export default MainPage;
