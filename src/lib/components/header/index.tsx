import { FunctionComponent, h } from "preact";

import style from "./style.module.css";

interface HeaderProps {
  title: string;
}

export const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  return (
    <header class={style.pageHeader}>
      <h1 class={style.pageTitle}>{title}</h1>
    </header>
  );
};
