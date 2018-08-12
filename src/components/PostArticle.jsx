import React from "react";

const PostArticle = ({ postArticle, handleChange }) => {
  return (
    <div>
      <form>
        <select id="topicDropdownInput" onChange={handleChange}>
          <option selected disabled>
            Choose a topic
          </option>
          <option value="coding">coding</option>
          <option value="cooking">cooking</option>
          <option value="football">football</option>
        </select>{" "}
        <br />
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
        <button onClick={postArticle}>POST ARTICLE</button>
      </form>
    </div>
  );
};

export default PostArticle;
