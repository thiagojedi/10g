import { FunctionComponent, h } from "preact";
import MainPage from "./main-page";
import { useLoggedState } from "../modules/application/hooks";

export const App: FunctionComponent = () => {
  // TODO Add global state provider
  // TODO Add routing
  // TODO Add @airgram/web connector

  const logged = useLoggedState();

  if (logged) return <MainPage />;

  return (
    <div>
      <h1>Proceed with log in</h1>
    </div>
  );
};
