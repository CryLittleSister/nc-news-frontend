import React, { Component } from "react";
import Login from "./Login";
import UserInfo from "./UserInfo";
import axios from "axios";

class UserBar extends Component {
  state = { users: [], username: "", password: "" };

  componentDidMount() {
    axios
      .get("https://tg-northcoders-news.herokuapp.com/api/users")
      .then(({ data }) => {
        this.setState({ users: data.users });
      });
  }

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
    const { username, password } = this.state;
    let userCheck = null;

    this.state.users.forEach(user => {
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

export default UserBar;
