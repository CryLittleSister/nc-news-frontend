import React from "react";
import { getSingleItem } from "../api";

const Article = ({ match, voteChange, handleClick }) => {
  return null;

  getSingleItem(match.params.article_id, "articles").then(article => {
    return (
      <div key={article._id}>
        <h2>{article.title}</h2>
        <article>{article.body}</article>
        score: {article.votes + voteChange}
        <button
          onClick={() => {
            handleClick(article._id, "up");
          }}
        >
          vote up
        </button>
        <button onClick={() => handleClick(article._id, "down")}>
          vote down
        </button>
        <p className="smallerText">
          posted at: {article.created_at} by: {article.created_by}
        </p>
      </div>
    );
  });
};

export default Article;
