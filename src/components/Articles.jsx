import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import Topics from "./Topics";
import moment from "moment";
import Loader from "./Loader";

class Articles extends Component {
  state = { articles: [], err: false, sortBy: "created_at" };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props.match.params;
    const { sortBy } = this.state;
    if (topic !== prevProps.match.params.topic || sortBy !== prevState.sortBy) {
      this.getArticles();
    }
  }

  render() {
    const { err, articles, sortBy } = this.state;
    const { topic } = this.props.match.params;

    if (!articles[0]) return <Loader />;

    if (err) return <Redirect to={`/error${err}`} />;
    return (
      <div className="articleList">
        <Topics disabled={topic || "all"} sort={this.sort} sortBy={sortBy} />
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
    const { sortBy } = this.state;
    let sortFunc =
      sortBy === "created_at"
        ? (a, b) => new Date(b[sortBy]) - new Date(a[sortBy])
        : (a, b) => a[sortBy].localeCompare(b[sortBy]);
    let set = ({ articles }) =>
      this.setState({ articles: articles.sort(sortFunc) });
    !topic
      ? api.getAll("articles").then(set)
      : api
          .getArticlesByTopic(topic)
          .then(set)
          .catch(err => this.setState({ err: err.response.status }));
  };

  sort = e => {
    let sortBy = e.target.className;
    this.setState({ sortBy });
  };
}

export default Articles;
