import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

class Articles extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (topic !== prevProps.match.params.topic) this.getArticles();
  }

  render() {
    return (
      <div className="articleList">
        {this.state.articles.map(article => {
          return (
            <Link
              key={article._id}
              className="articleTitles"
              to={`/article/${article._id}`}
            >
              <h2>{article.title}</h2>
              <p className="midText">
                <b>{article.votes} </b>
                votes | <b>{article.comments}</b> comments
              </p>
              <p className="smallerText">
                {new Date(article.created_at).toString()}
              </p>
            </Link>
          );
        })}
      </div>
    );
  }

  getArticles = () => {
    const { topic } = this.props.match.params;
    let set = ({ articles }) => this.setState({ articles });

    !topic
      ? api
          .getAll("articles")
          .then(set)
          .then(console.log(this.state.articles))
      : api
          .getArticlesByTopic(topic)
          .then(set)
          .then(console.log(this.state.articles));
  };
}

export default Articles;
