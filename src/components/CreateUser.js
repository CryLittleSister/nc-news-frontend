import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import PT from "prop-types";

class CreateUser extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    avatarURL: "",
    redirect: false,
    user: {}
  };

  render() {
    let { redirect, user } = this.state;
    if (redirect) return <Redirect to={`/users/${user._id}`} />;
    return (
      <form style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="full name"
          className="name"
          onChange={this.handleChange}
        />
        {this.state.errName && <p className="errText">* required</p>}
        <br />
        <input
          type="text"
          placeholder="username"
          className="username"
          onChange={this.handleChange}
        />
        {this.state.errUsername && <p className="errText">* required</p>}
        <br />
        <input
          type="text"
          placeholder="password"
          className="password"
          onChange={this.handleChange}
        />
        {this.state.errPassword && <p className="errText">* required</p>}
        <br />
        <input
          type="text"
          placeholder="avatar url"
          className="avatarURL"
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.createUser} onChange={this.handleChange}>
          CREATE
        </button>
      </form>
    );
  }

  handleChange = event => {
    let key = event.target.className;
    let val = event.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };

  createUser = e => {
    e.preventDefault();
    let { username, password, name, avatarURL } = this.state;
    !name
      ? this.setState({ errName: true })
      : !username
        ? this.setState({ errUsername: true, errName: false })
        : !password
          ? this.setState({ errPassword: true, errUsername: false })
          : api
              .addUser(username, password, name, avatarURL)
              .then(user => this.setState({ redirect: true, user }));
  };
}

export default CreateUser;
