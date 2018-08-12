import React from "react";
import { Link } from "react-router-dom";

const Topics = ({ topics }) => {
  return (
    <div>
      {topics.sort((a, b) => a.title > b.title).map(topic => (
        <Link
          to={`/articles/topics/${topic.slug}`}
          id={topic.slug}
          key={topic._id}
        >
          <button>{topic.title}</button>
        </Link>
      ))}
      <br />
      <Link to="/articles/new">POST NEW ARTICLE</Link>
    </div>
  );
};

export default Topics;
