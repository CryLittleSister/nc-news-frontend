import React from "react";
import PT from "prop-types";

const UserInfo = ({ user, logout }) => {
  return (
    <div>
      {user && (
        <div>
          <img
            className="avatar"
            src={user.avatar_url}
            onError={e => {
              e.target.src =
                "https://i.pinimg.com/736x/54/51/b1/5451b1758687ce3e6e6ecee798b396f8--little-miss-plush.jpg";
            }}
            alt="user avatar"
          />
          <h3>{user.username}</h3>
          <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  );
};

UserInfo.proptypes = {
  user: PT.object,
  logout: PT.func.isRequired
};

export default UserInfo;
