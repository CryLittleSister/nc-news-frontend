import React, { Component } from "react";
import Login from "./Login";
import UserInfo from "./UserInfo";
import axios from "axios";

class UserBar extends Component {
  state = { users: [] };

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
        {currentUser.username && <UserInfo user={currentUser} />}
        {!currentUser.username && <Login />}
      </div>
    );
  }
}

export default UserBar;
