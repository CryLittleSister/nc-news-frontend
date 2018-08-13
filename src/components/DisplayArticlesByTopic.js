import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getArticlesByTopic } from "../api";
import PT from "prop-types";

class DisplayArticlesByTopic extends Component {
  state = { articles: [] };

  componentDidMount() {
    const { topic } = this.props.match.params;
    getArticlesByTopic(topic).then(articles => this.setState({ articles }));
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (topic !== prevProps.match.params.topic) {
      getArticlesByTopic(topic).then(articles => {
        this.setState({
          articles,
          topic
        });
      });
    }
  }

  render() {
    return (
      <div className="articleList">
        {this.state.articles.map(article => {
          return (
            <Link
              key={article._id}
              className="articleTitles"
              to={`/articles/article/${article._id}`}
            >
              <h2>{article.title}</h2>
            </Link>
          );
        })}
      </div>
    );
  }
}

DisplayArticlesByTopic.propTypes = {
  articles: PT.array.isRequired
};

export default DisplayArticlesByTopic;
