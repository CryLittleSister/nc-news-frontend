import React from "react";

const PostArticle = ({
  currentUser,
  currentTopic,
  postArticle
  /*postArticle will be a method */
}) => {
  return (
    <div>
      <form>
        <select>
          <option value="" disabled selected>
            Choose a topic
          </option>
          <option value="coding">coding</option>
          <option value="cooking">cooking</option>
          <option value="football">football</option>
        </select>{" "}
        <br />
        <input placeholder="article title" /> <br />
        <textarea
          placeholder="type your article into here"
          rows="25"
          cols="50"
        />
        <button>POST ARTICLE</button>
      </form>
    </div>
  );
};

export default PostArticle;
