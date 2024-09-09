import React, { useMemo } from "react";
import { Avatar } from "../../common";

const MAX_AVATARS = 4;

const AvatarGroup = ({ avatars }) => {
  const [visibleAvatars, hiddenAvatars] = useMemo(() => {
    const avatarsCopy = avatars.slice();
    const visibleAvatars = avatarsCopy.splice(0, MAX_AVATARS);
    return [visibleAvatars, avatarsCopy];
  }, [avatars]);

  const hasMore = avatars.length !== visibleAvatars.length;

  return (
    <div className="avatar-group">
      {visibleAvatars.map((user, i) => {
        return (
          <Avatar title={i + 1} key={i}>
            {user.url ? <img src={user.url} alt={user.name} /> : null}
          </Avatar>
        );
      })}
      {hasMore && (
        <div className="tooltip-container">
          <Avatar title={`${avatars.length - MAX_AVATARS}+`} />
          {hiddenAvatars.length && (
            <div className="tooltip tooltip-dark align-bottom">
              {hiddenAvatars.map((avatar, i) => {
                return <div key={i}>{avatar.name}</div>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
