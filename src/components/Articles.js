import React, { Component } from "react";

import axios from "axios";
import Topics from "./Topics";

import PT from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    comments: [],
    topics: [],
    articleTitleInput: "",
    articleBodyInput: "",
    topicDropdownInput: "",

    newArticle: {}
  };

  componentDidMount() {
    this.getTopics();
  }

  render() {
    return (
      <div className="articles">{<Topics topics={this.state.topics} />}</div>
    );
  }

  getArticlesByTopic = topic => {
    axios
      .get(
        `https://tg-northcoders-news.herokuapp.com/api/topics/${topic}/articles`
      )
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      });
  };

  getTopics = () => {
    axios
      .get("https://tg-northcoders-news.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({ topics: data.topics });
      });
  };
}

Articles.propTypes = {
  currentArticle: PT.object,
  currentUser: PT.object,
  users: PT.array.isRequired
};

export default Articles;
