import { Link } from "react-router-dom";
import React, { Component } from "react";
import * as api from "../api";
import PT from "prop-types";

class Topics extends Component {
  state = { topics: [] };

  componentDidMount() {
    this.getTopics();
  }

  render() {
    const { sort, disabled, sortBy } = this.props;
    const { topics } = this.state;

    return (
      <div id="topics">
        <div id="sort">
          <button
            className="created_at"
            onClick={sort}
            disabled={sortBy === "created_at"}
          >
            Most Recent
          </button>
          <button
            className="title"
            onClick={sort}
            disabled={sortBy === "title"}
          >
            Alphabetical
          </button>
        </div>
        <div id="topicButtons">
          {topics.sort((a, b) => a.title > b.title).map(topic => (
            <Link to={`/topics/${topic.slug}`} id={topic.slug} key={topic._id}>
              <button disabled={disabled === topic.slug}>{topic.title}</button>
            </Link>
          ))}{" "}
          <Link to="/articles">
            <button disabled={disabled === "all"}>All</button>
          </Link>
          <br />
        </div>
        <Link className="link" id="postLink" to="/articles/post">
          POST NEW ARTICLE
        </Link>
      </div>
    );
  }

  getTopics = () => {
    api.getAll("topics").then(({ topics }) => {
      this.setState({ topics });
    });
  };
}

Topics.propTypes = {
  disabled: PT.string.isRequired,
  sort: PT.func.isRequired,
  sortBy: PT.string.isRequired
};

export default Topics;
