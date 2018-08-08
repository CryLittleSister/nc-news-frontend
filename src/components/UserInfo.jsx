import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div>
      {user && (
        <div>
          <img className="avatar" src={user.avatar_url} alt="user avatar" />
          <h3>{user.username}</h3>
          <button>go to full profile</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
