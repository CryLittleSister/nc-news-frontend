import React from "react";

const UndoVote = ({ handleClick, dir, id, itemType }) => {
  return (
    <div>
      <button onClick={() => handleClick(id, dir, itemType)}>undo vote</button>
    </div>
  );
};

export default UndoVote;
