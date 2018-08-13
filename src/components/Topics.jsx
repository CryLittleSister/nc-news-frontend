import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

const Topics = ({ topics }, p) => {
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
      <Link className="link" to="/articles/new">
        POST NEW ARTICLE
      </Link>
    </div>
  );
};

Topics.propTypes = {
  topics: PT.array.isRequired
};

export default Topics;
