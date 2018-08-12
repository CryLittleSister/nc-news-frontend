import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Topics from "./Topics";
import DisplayArticlesByTopic from "./DisplayArticlesByTopic";
import * as api from "../api";
import Article from "./Article";
import PostArticle from "./PostArticle";

class Articles extends Component {
  state = {
    articles: [],
    comments: [],
    topics: []
  };

  componentDidMount() {
    this.getTopics();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTopic !== this.state.currentTopic)
      this.state.currentTopic &&
        this.getArticlesByTopic(this.state.currentTopic);
  }

  render() {
    return (
      <div>
        {
          <Topics
            handleClick={this.handleTopicClick}
            topics={this.state.topics}
          />
        }
        <Route
          path="/articles/topics/:topic"
          render={props => (
            <DisplayArticlesByTopic articles={this.state.articles} {...props} />
          )}
        />

        <Route
          path="/articles/article/:article_id"
          render={props => <Article {...props} />}
        />
        <Route
          path="/articles/new"
          render={() => <PostArticle user={this.props.currentUser} />}
        />
      </div>
    );
  }
  handleTopicClick = e => {
    this.setState({ currentTopic: e.target.id });
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

  getTopics = () => {
    axios
      .get("https://tg-northcoders-news.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({ topics: data.topics });
      });
  };
}

export default Articles;
