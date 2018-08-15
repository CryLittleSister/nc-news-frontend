import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

class DisplayArticlesByTopic extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (topic !== prevProps.match.params.topic) this.getArticles(topic);
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
            </Link>
          );
        })}
      </div>
    );
  }

  getArticles = () => {
    const { topic } = this.props.match.params;
    api.getArticlesByTopic(topic).then(articles => this.setState({ articles }));
  };
}

export default DisplayArticlesByTopic;
