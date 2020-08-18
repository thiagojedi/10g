import { FunctionComponent, h } from "preact";
import MainPage from "./main-page";
import { useLoggedState } from "../modules/application/hooks";
import LoginPage from "./login-page";

export const App: FunctionComponent = () => {
  // TODO Add routing

  const loggedState = useLoggedState();

  if (loggedState.logged) return <MainPage />;

  return <LoginPage loggedState={loggedState} />;
};
