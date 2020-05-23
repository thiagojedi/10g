import { FunctionComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { TextAvatar } from "./text-avatar";

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
    <a className="list-item" href="#" tabIndex={0} ref={ref}>
      <div className="image-wrapper">
        {iconUrl ? (
          <img src={iconUrl} alt="" />
        ) : (
          <TextAvatar text={primaryText} />
        )}
      </div>
      <div className="info-wrapper">
        <p className="pri">{primaryText}</p>
        {secondaryText && <p className="sec">{secondaryText}</p>}
        {tertiaryText && <p className="thi">{tertiaryText}</p>}
      </div>
      <div className="arrow-wrapper">
        <span className="kai-icon-arrow" />
      </div>

      <style jsx>{`
        .list-item {
          padding: 1rem;
          display: flex;
          align-items: center;
          color: inherit;
          text-decoration: none;
        }

        .list-item:focus {
          background-color: #eee;
        }

        .thi {
          color: #444;
        }

        .info-wrapper {
          flex-grow: 1;
        }

        .image-wrapper {
          width: 3.6rem;
          height: 3.6rem;
          margin-right: 0.6rem;
        }

        .image-wrapper img {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </a>
  );
};
