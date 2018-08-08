import React, { Component } from "react";
import axios from "axios";
import Topics from "./Topics";
import DisplayArticles from "./DisplayArticles";

class Articles extends Component {
  state = {
    articles: [],
    comments: []
    /*current user etc fed from App. also send a method which allows changing of app state of current user/article etc */
  };

  componentDidMount() {
    axios
      .get("https://tg-northcoders-news.herokuapp.com/api/articles")
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      });
  }

  render() {
    return (
      <div>
        <Topics />
        <DisplayArticles articles={this.state.articles} />
      </div>
    );
  }

  pickTopic = topic => {
    axios
      .get(`https://tg-northcoders-news.herokuapp.com/api/topics/${topic}`)
      .then(({ data }) => {
        this.setState({ users: data.users });
      });
  };

  getArticlesByTopic = topic => {
    axios
      .get(
        `https://tg-northcoders-news.herokuapp.com/api/topics/${topic}/articles`
      )
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      });
  };
}
/* any methods that create, delete or edit articles and comments will live here. all voting lives here too */
export default Articles;
