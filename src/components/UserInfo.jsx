import React from "react";
import PT from "prop-types";
import { Link } from "react-router-dom";

const UserInfo = ({ user, logout }) => {
  return (
    <div>
      {user && (
        <div>
          <Link to={`/users/${user._id}`}>
            <img
              className="avatar"
              src={user.avatar_url}
              onError={e => {
                e.target.src =
                  "http://www.landstromcenter.com/Websites/landstromcenter/images/staff/placeholder.jpg";
              }}
              alt="user avatar"
            />
          </Link>

          <h3 id="loggedUsername">{user.username}</h3>
          <button onClick={logout}>Logout</button>
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
