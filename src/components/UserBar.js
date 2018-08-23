import React, { Component } from "react";
import Login from "./Login";
import UserInfo from "./UserInfo";
import PT from "prop-types";
import { Link } from "react-router-dom";

class UserBar extends Component {
  state = { username: "", password: "" };

  render() {
    let { pathname } = this.props.location;
    const { currentUser } = this.props;
    return (
      <div id="userBar">
        {/\/users\//.test(pathname) || /^\/$/.test(pathname) ? (
          <Link className="link" to="/articles">
            <p id="backArticles"> All Articles</p>
          </Link>
        ) : (
          <p />
        )}
        {currentUser.username ? (
          <UserInfo
            className="login"
            logout={this.props.logout}
            user={currentUser}
          />
        ) : (
          <Login
            className="login"
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
            password={this.state.password}
          />
        )}
      </div>
    );
  }

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    let userCheck = null;
    console.log(password);
    this.props.users.forEach(user => {
      if (user.username === username.toLowerCase()) userCheck = user;
    });
    !userCheck
      ? alert("There are no users with that username")
      : userCheck.password !== password
        ? alert("Incorrect password. Please try again")
        : this.props.setCurrentUser(userCheck._id);
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
  currentUser: PT.object
};

export default UserBar;
