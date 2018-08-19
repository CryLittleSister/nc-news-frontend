import React from "react";
import Vote from "./Vote";
import PT from "prop-types";
import UndoVote from "./UndoVote";

const Comments = ({
  comments,
  vote,
  user,
  deleteComment,
  convert,
  voteChange
}) => {
  return (
    <div>
      {comments
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(comment => {
          return (
            <div key={comment._id}>
              <p>{comment.body}</p>
              score: {comment.votes + (voteChange[comment._id] || 0)}
              {!user.votes || !user.votes.comments[comment._id] ? (
                <Vote handleClick={vote} item={comment} itemType="comments" />
              ) : (
                <UndoVote
                  handleClick={vote}
                  dir={user.votes.comments[comment._id] === 1 ? "down" : "up"}
                  id={comment._id}
                  itemType="comments"
                />
              )}
              <p className="smallerText">
                posted on: {new Date(comment.created_at).toString()} by:{" "}
                {convert(comment.created_by)}
              </p>
              {comment.created_by === user._id && (
                <button id={comment._id} onClick={deleteComment}>
                  DELETE COMMENT
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};

Comments.propTypes = {
  convert: PT.func.isRequired,
  vote: PT.func.isRequired,
  deleteComment: PT.func.isRequired,
  comments: PT.array.isRequired
};

export default Comments;
