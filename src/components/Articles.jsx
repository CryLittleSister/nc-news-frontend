import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import Topics from "./Topics";
import moment from "moment";

class Articles extends Component {
  state = { articles: [], err: false };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (topic !== prevProps.match.params.topic) {
      this.getArticles();
    }
  }

  render() {
    let { err, articles } = this.state;
    if (err) return <Redirect to={`/error${err}`} />;
    return (
      <div className="articleList">
        <Topics disabled={this.props.match.params.topic || "all"} />
        {articles.map(article => {
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
                {moment(article.created_at)
                  .format("ddd DD MMM YYYY ")
                  .toString()}
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
      ? api.getAll("articles").then(set)
      : api
          .getArticlesByTopic(topic)
          .then(set)
          .catch(err => this.setState({ err: err.response.status }));
  };
}

export default Articles;
