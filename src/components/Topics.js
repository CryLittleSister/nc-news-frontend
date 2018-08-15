import { Link } from "react-router-dom";
import React, { Component } from "react";
import * as api from "../api";

class Topics extends Component {
  state = { topics: [] };

  componentDidMount() {
    this.getTopics();
  }

  render() {
    console.log(this.state.topics, "***", Array.isArray(this.state.topics));
    return (
      <div>
        {this.state.topics.sort((a, b) => a.title > b.title).map(topic => (
          <Link to={`/topics/${topic.slug}`} id={topic.slug} key={topic._id}>
            <button>{topic.title}</button>
          </Link>
        ))}
        <br />
        <Link className="link" to="/articles/post">
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

export default Topics;
