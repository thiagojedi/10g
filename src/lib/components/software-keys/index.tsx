import { FunctionComponent, h } from "preact";
import { useEffect } from "preact/hooks";

import style from "./style.module.css";

interface SoftwareKeysProps {
  leftKey?: string;
  rightKey?: string;
  centerKey?: string;
  onLeftKey?: () => void;

  onCenterKey?: () => void;

  onRightKey?: () => void;
}

export const SoftwareKeys: FunctionComponent<SoftwareKeysProps> = ({
  centerKey,
  leftKey,
  rightKey,
  onLeftKey,
  onRightKey,
  onCenterKey,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "SoftLeft":
        case "j":
          if (onLeftKey) onLeftKey();
          break;
        case "SoftRight":
        case "k":
          if (onRightKey) onRightKey();
          break;
        case "Enter":
          if (onCenterKey) onCenterKey();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLeftKey, onRightKey, onCenterKey]);

  return (
    <footer id={style.sftwKeys}>
      <div id="left-key">
        {leftKey && <span className="h5">{leftKey}</span>}
      </div>
      <div id={style.centerKey}>{centerKey && <h5>{centerKey}</h5>}</div>
      <div id={style.rightKey}>{rightKey && <h5>{rightKey}</h5>}</div>
    </footer>
  );
};
