import React from "react";
import { Link } from "react-router-dom";

const Homepage = ({ articles, sortBy, sort }) => {
  return (
    <div>
      <h1>
        {sortBy === "votes"
          ? "Top Articles"
          : sortBy === "comments"
            ? "Most Talked About Articles"
            : "Most Recent Articles"}
      </h1>{" "}
      sort by <br />
      <button onClick={sort} id="votes">
        highest scores
      </button>
      <button onClick={sort} id="comments">
        most comments
      </button>
      <button onClick={sort} id="created_at">
        most recent
      </button>
      {articles.map(article => {
        let img =
          article.belongs_to === "football"
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_D7nKu_Tf0AgEtLf5Huq-HgbWKdjBQ-YdH6WCxaUxrFNhEWe0Sw"
            : article.belongs_to === "coding"
              ? "https://www.text100.com/wp-content/uploads/2015/04/codingfeatured.jpg"
              : "https://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/1522180417/cooking-one-woman.jpg";
        return (
          <div key={article._id} className="homeWrapper">
            <img src={img} alt={article.belongs_to} className="articleImage" />
            <div className="homeArts">
              <Link className="link" to={`/article/${article._id}`}>
                {article.title}
              </Link>
              <p className="homeA">{article.belongs_to}</p>
              <p className="homeA">
                <b>{article.votes} </b>
                votes | <b>{article.comments}</b> comments
              </p>
              <p className="smallerText">
                {new Date(article.created_at).toString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
