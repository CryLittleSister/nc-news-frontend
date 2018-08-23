import React, { Component } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";

class User extends Component {
  state = { user: {}, articles: [] };

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
    let { user, articles } = this.state;

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

          {articles.map(article => {
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
    const { match } = this.props;
    api.getSingleItem(match.params.user_id, "users").then(({ user }) => {
      this.setState({ user });
    });
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
