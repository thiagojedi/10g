import { FunctionComponent, h } from "preact";

interface ListItemProps {
  primaryText: string;
  secondaryText?: string;
  tertiaryText?: string;
  iconUrl?: string;
}

export const ListItem: FunctionComponent<ListItemProps> = ({
  primaryText,
  secondaryText,
  tertiaryText,
  iconUrl
}) => (
  <div className="list-item">
    <div className="image-wrapper">
      {iconUrl && <img src={iconUrl} alt="" />}
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
      div.list-item {
        padding: 1rem;
        display: flex;
        align-items: center;
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
  </div>
);
