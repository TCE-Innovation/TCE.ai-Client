import React, { useMemo } from "react";
import { Avatar } from "../../common";

const MAX_AVATARS = 4;

const AvatarGroup = ({ avatars }) => {
  const [visibleAvatars] = useMemo(() => {
    const avatarsCopy = avatars.slice();
    const visibleAvatars = avatarsCopy.splice(0, MAX_AVATARS);
    return [visibleAvatars, avatarsCopy];
  }, [avatars]);

  const hasMore = avatars.length !== visibleAvatars.length;

  return (
    <div className="avatar-group">
      {visibleAvatars.map((user, i) => {
        const [firstName = "", lastName = ""] = (
          user.name || user.email
        )?.split(" ");
        const [F = ""] = firstName;
        const [L = ""] = lastName;
        const title = [F.toUpperCase(), L.toUpperCase()].join(" ");
        return (
          <div className="tooltip-container" key={`${user.email}-${i}`}>
            <Avatar title={title}>
              {user.url ? (
                <img src={user.url} alt={user.name || user.email} />
              ) : null}
            </Avatar>
            <div
              className={`${
                user.name || user.email ? "tooltip" : ""
              } tooltip-dark align-bottom`}
            >
              {user.name || user.email}
            </div>
          </div>
        );
      })}
      {hasMore && (
        <div className="tooltip-container">
          <div className="hidden-avatars-count">
            <Avatar title={`+${avatars.length - MAX_AVATARS}`} />
            {/* {hiddenAvatars.length && (
              <div className="tooltip tooltip-dark align-bottom">
                {hiddenAvatars.map((avatar) => {
                  return <div key={avatar.email}>{avatar.name}</div>;
                })}
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
