import { FunctionComponent, h } from "preact";

interface SoftwareKeysProps {
  leftKey?: string;
  rightKey?: string;
  centerKey?: string;
}

export const SoftwareKeys: FunctionComponent<SoftwareKeysProps> = ({
  centerKey,
  leftKey,
  rightKey
}) => {
  return (
    <footer id="sftw-keys">
      <div id="left-key">
        {leftKey && <span className="h5">{leftKey}</span>}
      </div>
      <div id="center-key">{centerKey && <h5>{centerKey}</h5>}</div>
      <div id="right-key">{rightKey && <h5>{rightKey}</h5>}</div>

      <style jsx>{`
        #sftw-keys {
          height: 3rem;
          padding: 0 0.5rem;

          display: grid;
          grid-column-gap: 0.5rem;
          grid-template-columns: 1fr minmax(2.4rem, 7.6rem) 1fr;

          background-color: lightgray;
          color: black;
        }

        #sftw-keys > * {
          align-self: center;
        }

        #right-key {
          text-align: right;
        }

        #center-key {
          text-align: center;
          text-transform: uppercase;
        }
      `}</style>
    </footer>
  );
};
