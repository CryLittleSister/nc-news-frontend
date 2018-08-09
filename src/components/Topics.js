import React from "react";

const Topics = ({ topics, handleClick }) => {
  return (
    <div>
      {topics.map(topic => (
        <button id={topic.slug} onClick={handleClick} key={topic._id}>
          {topic.title}
        </button>
      ))}
    </div>
  );
};

export default Topics;
