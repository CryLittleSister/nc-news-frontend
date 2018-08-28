import React, { Component } from "react";
import Login from "./Login";
import UserInfo from "./UserInfo";
import PT from "prop-types";
import { Link } from "react-router-dom";
import "../Users.css";

class UserBar extends Component {
  state = { username: "", password: "" };

  render() {
    const { pathname } = this.props.location;
    const { currentUser, logout } = this.props;
    return (
      <div id="userBar">
        {/\/users\//.test(pathname) || /^\/$/.test(pathname) ? (
          <Link className="link" to="/articles">
            <p className="backArticles"> All Articles</p>
          </Link>
        ) : (
          <p />
        )}
        {currentUser.username ? (
          <UserInfo className="login" logout={logout} user={currentUser} />
        ) : (
          <Login
            className="login"
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
          />
        )}
      </div>
    );
  }

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { users, setCurrentUser } = this.props;
    let userCheck = null;
    users.forEach(user => {
      if (user.username === username.toLowerCase()) userCheck = user;
    });
    !userCheck
      ? alert("There are no users with that username")
      : userCheck.password !== password
        ? alert("Incorrect password. Please try again")
        : setCurrentUser(userCheck._id);
  };

  handleChange = event => {
    let key = event.target.className;
    let val = event.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };
}

UserBar.propTypes = {
  currentUser: PT.object,
  users: PT.array.isRequired,
  setCurrentUser: PT.func.isRequired,
  logout: PT.func.isRequired
};

export default UserBar;
