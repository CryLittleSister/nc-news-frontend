import React from "react";
import Vote from "./Vote";
import PT from "prop-types";

const Comments = ({ comments, vote, user, deleteComment, convert }) => {
  return (
    <div>
      {comments.map(comment => {
        return (
          <div key={comment._id}>
            <p>{comment.body}</p>
            score: {comment.votes}
            <Vote handleClick={vote} item={comment} itemType="comments" />
            <p className="smallerText">
              posted on: {new Date(comment.created_at).toString()} by:{" "}
              {convert(comment.created_by)}
            </p>
            {comment.created_by === user && (
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
  comments: PT.array.isRequired,
  user: PT.string
};

export default Comments;