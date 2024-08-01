import React from "react";
import { Avatar } from "../../../common";

const MAX_AVATARS = 4;

const AvatarGroup = ({ avatars }) => {
  const visibleAvatars = avatars.slice(0, MAX_AVATARS);
  const hasMore = avatars.length !== visibleAvatars.length;
  return (
    <div className="avatar-group">
      {visibleAvatars.map((user, i) => {
        return <Avatar title={i + 1} key={i}></Avatar>;
      })}
      {hasMore && <Avatar title={`${avatars.length - MAX_AVATARS}+`} />}
    </div>
  );
};

export default AvatarGroup;
