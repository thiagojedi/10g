import { useState } from "preact/hooks";
import { useAirgram } from "../airgram-context";

export const useLoggedState = () => {
  const [logged, setLogged] = useState(false);

  const airgram = useAirgram();
  airgram.on("updateAuthorizationState", async ({ update }, next) => {
    const currentState = update.authorizationState._;

    console.log(currentState);
    switch (currentState) {
      case "authorizationStateReady":
        setLogged(true);
        break;
      case "authorizationStateWaitPhoneNumber":
        await airgram.api.setAuthenticationPhoneNumber({
          phoneNumber: prompt("Phone number")!,
        });
        break;
      case "authorizationStateWaitCode":
        await airgram.api.checkAuthenticationCode({
          code: prompt("Received code")!,
        });
        break;
      case "authorizationStateLoggingOut":
      case "authorizationStateClosed":
      case "authorizationStateClosing":
        setLogged(false);
        localStorage.clear();
        break;
    }
    return next();
  });
  return logged;
};
