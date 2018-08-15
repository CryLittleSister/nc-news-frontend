import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

import PT from "prop-types";

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    console.log(this.state.articles);
    return this.state.articles.map(article => (
      <div key={article._id} className="articleList">
        <Link className="articleTitles" to={`/article/${article._id}`}>
          <h2>{article.title}</h2>
        </Link>
      </div>
    ));
  }

  getArticles = () => {
    api.getAll("articles").then(({ articles }) => this.setState({ articles }));
  };
}

Articles.propTypes = {
  currentArticle: PT.object,
  currentUser: PT.object,
  users: PT.array.isRequired
};

export default Articles;
