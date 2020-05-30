import { h, render } from "preact";
import { App } from "./pages/app";
import { AirgramProvider } from "./modules/application/airgram-context";

render(
  <AirgramProvider>
    <App />
  </AirgramProvider>,
  document.body,
);
