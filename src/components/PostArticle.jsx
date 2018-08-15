import React from "react";
import { Redirect } from "react-router-dom";
import PT from "prop-types";

const PostArticle = ({ postArticle, handleChange, redirect, newArticle }) => {
  if (redirect) return <Redirect to={`/article/${newArticle._id}`} />;
  return (
    <div className="articles">
      <form>
        <select id="topicDropdownInput" onChange={handleChange}>
          <option selected disabled>
            Choose a topic
          </option>
          <option value="coding">coding</option>
          <option value="cooking">cooking</option>
          <option value="football">football</option>
        </select>{" "}
        <input
          id="articleTitleInput"
          onChange={handleChange}
          placeholder="article title"
        />{" "}
        <br />
        <textarea
          id="articleBodyInput"
          onChange={handleChange}
          placeholder="type your article into here"
          rows="25"
          cols="50"
        />
        <br />
        <button onClick={postArticle}>POST ARTICLE</button>
      </form>
    </div>
  );
};

PostArticle.propTypes = {
  postArticle: PT.func.isRequired,
  handleChange: PT.func.isRequired,
  redirect: PT.bool,
  newArticle: PT.object
};

export default PostArticle;
