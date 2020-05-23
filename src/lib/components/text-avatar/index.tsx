import { FunctionComponent, h } from "preact";
import { getInitials } from "../../helpers/text";

import style from "./style.module.css";

type TextAvatarProps = {
  text: string;
};

export const TextAvatar: FunctionComponent<TextAvatarProps> = ({ text }) => {
  const initials = getInitials(text);
  return (
    <div className={style.textAvatar}>
      <span>{initials}</span>
    </div>
  );
};
