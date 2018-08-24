import React from "react";
import PT from "prop-types";

const UndoVote = ({ handleClick, dir, id, itemType }) => {
  return (
    <div>
      <button onClick={() => handleClick(id, dir, itemType)}>undo vote</button>
    </div>
  );
};

UndoVote.proptypes = {
  handleclick: PT.func.isRequired,
  dir: PT.string.isRequired,
  id: PT.string.isRequired,
  itemType: PT.string.isRequired
};

export default UndoVote;
