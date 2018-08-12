import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getArticlesByTopic } from "../api";

class DisplayArticlesByTopic extends Component {
  state = { articles: [] };

  componentDidMount() {
    const { topic } = this.props.match.params;
    getArticlesByTopic(this.props.match.params.topic).then(articles =>
      this.setState({ articles })
    );
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
      <div>
        {this.state.articles.map(article => {
          return (
            <Link to={`/articles/article/${article._id}`} key={article.id}>
              <h2>{article.title}</h2>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default DisplayArticlesByTopic;
