import { h, createContext, FunctionComponent } from "preact";
import { Airgram, AirgramConfig } from "@airgram/web";
import { useContext } from "preact/hooks";

const APP_ID = 123456789; /* APP_ID here */
const APP_HASH = "app_hash";

const options: AirgramConfig = {
  apiId: APP_ID,
  apiHash: APP_HASH,
  // logVerbosityLevel: 2,
  jsLogVerbosityLevel: "debug",
  // useDatabase: true,
  useSecretChats: false,
  mode: "auto",
};
const context = createContext<Airgram>(null!);

export const AirgramProvider: FunctionComponent<{ instance?: Airgram }> = ({
  children,
  instance,
}) => {
  const airgram = instance ?? new Airgram(options);

  return <context.Provider value={airgram}>{children}</context.Provider>;
};

export const useAirgram = () => useContext(context);
