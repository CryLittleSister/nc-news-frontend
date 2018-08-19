import React from "react";

const UndoVote = ({ handleClick, dir, id, itemType }) => {
  return (
    <div>
      <p className="alert">thanks for voting!</p>
      <button onClick={() => handleClick(id, dir, itemType)}>undo</button>
    </div>
  );
};

export default UndoVote;
