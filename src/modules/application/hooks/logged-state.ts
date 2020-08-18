import { useCallback, useEffect, useState } from "preact/hooks";
import { useAirgram } from "../airgram-context";
import { UpdateAuthorizationState } from "@airgram/web";

export const useLoggedState = () => {
  const [logged, setLogged] = useState(() => !!localStorage.getItem("logged"));
  useEffect(() => {
    localStorage.setItem("logged", JSON.stringify(logged));
  }, [logged]);

  const [code, setCode] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhone] = useState<string>("");
  const [status, setStatus] = useState("");

  const callback = useCallback(
    async (
      { update }: { update: UpdateAuthorizationState },
      next: () => void,
    ) => {
      const currentState = update.authorizationState._;

      setStatus(currentState);
      switch (currentState) {
        case "authorizationStateReady":
          setLogged(true);
          break;
        case "authorizationStateWaitPhoneNumber":
          break;
        case "authorizationStateWaitCode":
          break;
        case "authorizationStateWaitTdlibParameters":
        case "authorizationStateWaitEncryptionKey":
        case "authorizationStateWaitOtherDeviceConfirmation":
        case "authorizationStateWaitRegistration":
        case "authorizationStateWaitPassword":
        case "authorizationStateLoggingOut":
        case "authorizationStateClosed":
        case "authorizationStateClosing":
          setLogged(false);
          localStorage.clear();
          break;
      }
      return next();
    },
    [phoneNumber, code],
  );

  const airgram = useAirgram();
  useEffect(() => {
    airgram.on("updateAuthorizationState", callback);
  }, [callback]);

  useEffect(() => {
    if (
      status === "authorizationStateWaitPhoneNumber" &&
      (phoneNumber.length ?? 0) > 0
    ) {
      airgram.api.setAuthenticationPhoneNumber({ phoneNumber });
    }

    if (status === "authorizationStateWaitCode" && (code?.length ?? 0) > 0) {
      airgram.api.checkAuthenticationCode({ code });
    }
  }, [status, phoneNumber, code]);

  return { logged, setCode, setPhone, status };
};
