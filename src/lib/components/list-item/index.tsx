import { FunctionComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { TextAvatar } from "../text-avatar";

import style from "./style.module.css";

interface ListItemProps {
  primaryText: string;
  secondaryText?: string;
  tertiaryText?: string;
  iconUrl?: string;
  focused?: boolean;
}

export const ListItem: FunctionComponent<ListItemProps> = ({
  primaryText,
  secondaryText,
  tertiaryText,
  iconUrl,
  focused = false,
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (focused && ref.current !== null) ref.current.focus();
  }, [focused, ref]);

  return (
    <a className={style.listItem} href="#" tabIndex={0} ref={ref}>
      <div className={style.imageWrapper}>
        {iconUrl ? (
          <img src={iconUrl} alt="" />
        ) : (
          <TextAvatar text={primaryText} />
        )}
      </div>
      <div className={style.infoWrapper}>
        <p className="pri">{primaryText}</p>
        {secondaryText && <p className="sec">{secondaryText}</p>}
        {tertiaryText && <p className={style.thi}>{tertiaryText}</p>}
      </div>
      <div className="arrow-wrapper">
        <span className="kai-icon-arrow" />
      </div>

      <style jsx>{``}</style>
    </a>
  );
};
