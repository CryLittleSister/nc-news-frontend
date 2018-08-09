import React from "react";
import { Link } from "react-router-dom";

const DisplayArticlesByTopic = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        return (
          <Link to="" key={article.id}>
            <h2>{article.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayArticlesByTopic;
