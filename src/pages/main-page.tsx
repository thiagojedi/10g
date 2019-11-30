import {h} from "preact";
import {MainLayout} from "../modules/application/main-layout";
import {ListItem} from "../lib/components/list-item";

const MainPage = () => {
  const contactList = [
    {
      title: "Mr Anderson",
      status: "online"
    },
    {
      title: "Morpheus",
      status: "offline"
    },
    {
      title: "Agent Smith",
      status: "online"
    }
  ];
  return (
    <MainLayout headerTitle="Ten Grams" actions>
      {contactList.map((item, i) => (
        <ListItem key={i} primaryText={item.title} />
      ))}
    </MainLayout>
  );
};

export default MainPage;
