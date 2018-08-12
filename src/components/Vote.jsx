import React from "react";

const Vote = ({ handleClick, item, itemType }) => {
  return (
    <div>
      <button
        onClick={() => {
          handleClick(item._id, "up", `${itemType}`);
        }}
      >
        vote up
      </button>
      <button onClick={() => handleClick(item._id, "down", `${itemType}`)}>
        vote down
      </button>
    </div>
  );
};

export default Vote;
