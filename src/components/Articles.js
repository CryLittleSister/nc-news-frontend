import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Topics from "./Topics";
import DisplayArticlesByTopic from "./DisplayArticlesByTopic";
import * as api from "../api";
import Article from "./Article";

class Articles extends Component {
  state = {
    articles: [],
    comments: [],
    topics: [],
    currentTopic: "",
    voteChange: 0
    /*current user etc fed from App. also send a method which allows changing of app state of current user/article etc */
  };

  componentDidMount() {
    this.getTopics();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updating...");
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
        <DisplayArticlesByTopic articles={this.state.articles} />
        <Route
          path="/articles/:article_id"
          render={props => (
            <Article
              {...props}
              voteChange={this.state.voteChange}
              handleClick={this.handleArticleVote}
            />
          )}
        />
      </div>
    );
  }

  handleTopicClick = e => {
    this.setState({ currentTopic: e.target.id });
  };

  handleArticleVote = (id, direction) => {
    api.handleVote(id, direction, "articles").then(
      this.setState({
        voteChange: direction === "up" ? 1 : -1
      })
    );
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

  vote = () => {};
}
/* any methods that create, delete or edit articles and comments will live here. all voting lives here too */
export default Articles;
