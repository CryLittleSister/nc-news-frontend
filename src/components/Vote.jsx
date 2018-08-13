import React from "react";
import PT from "prop-types";

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

Vote.propTypes = {
  handleClick: PT.func.isRequired,
  item: PT.object.isRequired,
  itemType: PT.string.isRequired
};

export default Vote;
