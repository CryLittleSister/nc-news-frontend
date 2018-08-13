import React, { Component } from "react";
import Login from "./Login";
import UserInfo from "./UserInfo";
import PT from "prop-types";

class UserBar extends Component {
  state = { username: "", password: "" };

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {currentUser.username && (
          <UserInfo logout={this.props.logout} user={currentUser} />
        )}
        {!currentUser.username && (
          <Login
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
          />
        )}
      </div>
    );
  }

  handleLogin = e => {
    e.preventDefault();
    const { username } = this.state;
    let userCheck = null;

    this.props.users.forEach(user => {
      if (user.username === username) userCheck = user;
    });
    !userCheck
      ? alert("There are no users with that username")
      : // : userCheck.password !== password
        //   ? alert("Incorrect password. Please try again")
        this.props.setCurrentUser(userCheck);
  };

  handleChange = event => {
    let key = event.target.id;
    let val = event.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };
}

UserBar.propTypes = {
  currentUser: PT.object
};

export default UserBar;
