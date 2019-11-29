import { FunctionComponent, h } from "preact";

interface HeaderProps {
  title: string;
}

export const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>

      <style jsx>{`
        header {
          width: 100%;
          line-height: 2.8rem;
          outline: none;
          background-color: #2ca5e0;
        }

        h1 {
          color: #fff;
          text-align: center;
          padding: 0 1rem;
        }
      `}</style>
    </header>
  );
};
