import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Topics extends Component {
  state = { topics: [] };

  componentDidMount() {
    axios
      .get("https://tg-northcoders-news.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({ topics: data.topics });
      });
  }

  render() {
    return (
      <div>
        {this.state.topics.map(topic => (
          <Link to={`/articles/${topic.slug}`}>{`| ${topic.title} |`}</Link>
        ))}
      </div>
    );
  }
}

export default Topics;
