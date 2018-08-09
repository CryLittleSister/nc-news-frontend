import React from "react";

const DisplayArticles = ({ articles, handleClick }) => {
  return (
    <div>
      {articles.map(article => {
        return (
          <div key={article._id}>
            <h2>{article.title}</h2>
            <article>{article.body}</article>
            <button onClick={() => handleClick(article, "up")}>
              vote up
            </button>
            <button onClick={() => handleClick(article, "down")}>
              vote down
            </button>
            <p className="smallerText">
              posted at: {article.created_at} by: {article.created_by}
              {article.votes}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayArticles;
