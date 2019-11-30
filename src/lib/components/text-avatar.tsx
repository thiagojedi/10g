import {FunctionComponent, h} from "preact";
import {toInitials} from "../helpers/text";

export const TextAvatar: FunctionComponent = () => {
    const initials = toInitials("Mr Anderson");
    return (
        <div className="textAvatar">
            <span>{initials}</span>
            <style jsx>{`
        .text-avatar {
          margin: auto;
          width: 3.6rem;
          height: 3.6rem;
          border-radius: 50%;
          background-color: #666;
          color: white;
          text-align: center;
        }

        .text-avatar span {
          position: relative;
          top: 25%;
          font-size: 1.2rem;
          text-transform: uppercase;
        }
      `}</style>
        </div>
    );
};
