import React, { Component } from "react";
import * as api from "../api";
import { Link, Redirect } from "react-router-dom";
import "../Users.css";
import Loader from "./Loader";

class User extends Component {
  state = { user: {}, articles: [], err: false };

  componentDidMount() {
    this.getUser();
    this.getUserArticles();
  }

  componentDidUpdate(...args) {
    if (this.state === args[1]) {
      this.getUser();
      this.getUserArticles();
    }
  }

  render() {
    const { user, articles, err } = this.state;

    if (!user.username) return <Loader />;

    if (err) return <Redirect to={`/error${err}`} />;

    return (
      <div id="userInfo">
        <img
          src={user.avatar_url}
          alt="user profile avatar"
          id="userPic"
          onError={e => {
            e.target.src =
              "http://www.landstromcenter.com/Websites/landstromcenter/images/staff/placeholder.jpg";
          }}
        />
        <div id="userText">
          <h2 id="userUsername"> {user.username}</h2>
          {user.name}
          's most recent articles
          {articles
            .sort(
              (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
            )
            .map(article => {
              return (
                <div key={article._id}>
                  <Link to={`/article/${article._id}`} id="userArticles">
                    {article.title}
                  </Link>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  getUser = () => {
    const { user_id } = this.props.match.params;
    api
      .getSingleItem(user_id, "users")
      .then(({ user }) => this.setState({ user }))
      .catch(err => this.setState({ err: err.response.status }));
  };

  getUserArticles = () => {
    api.getAll("articles").then(({ articles }) => {
      this.setState({
        articles: articles.filter(
          article => article.created_by === this.state.user._id
        )
      });
    });
  };
}

export default User;
