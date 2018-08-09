import React, { Component } from "react";
import axios from "axios";
import Topics from "./Topics";
import DisplayArticles from "./DisplayArticles";

class Articles extends Component {
  state = {
    articles: [],
    comments: [],
    topics: [],
    currentTopic: ""
    /*current user etc fed from App. also send a method which allows changing of app state of current user/article etc */
  };

  componentDidMount() {
    this.getTopics();
  }

  componentDidUpdate(prevProps) {
    this.state.currentTopic && this.getArticlesByTopic(this.state.currentTopic);
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
        <DisplayArticles
          articles={this.state.articles}
          handleClick={this.handleVoteClick}
        />
      </div>
    );
  }

  handleTopicClick = e => {
    this.setState({ currentTopic: e.target.id });
  };

  handleVoteClick = (article, vote) => {
    console.log(this.state.articles[0], "<<<<<<<<<<<<b4");
    axios
      .put(
        `https://tg-northcoders-news.herokuapp.com/api/articles/${
          article._id
        }?vote=${vote}`
      )
      .then(this.getArticlesByTopic(this.state.currentTopic)
        console.log(this.state.articles[0], "<<<<<<<<<<<<afta"));
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
