import React from "react";
import { Redirect } from "react-router-dom";
import PT from "prop-types";
import { Link } from "react-router-dom";

const PostArticle = ({ postArticle, handleChange, redirect, newArticle }) => {
  if (redirect) return <Redirect to={`/article/${newArticle._id}`} />;
  return (
    <div className="articles">
      <Link className="link backArticles" to="/articles">
        <i className="fas fa-arrow-left backArticles"> Back to All Articles</i>
      </Link>
      <form>
        <select className="topicDropdownInput" onChange={handleChange}>
          <option selected disabled>
            Choose a topic
          </option>
          <option value="coding">coding</option>
          <option value="cooking">cooking</option>
          <option value="football">football</option>
        </select>{" "}
        <input
          className="articleTitleInput"
          onChange={handleChange}
          placeholder="article title"
        />{" "}
        <br />
        <textarea
          className="articleBodyInput"
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
