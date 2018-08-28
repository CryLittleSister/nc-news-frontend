import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "../Homepage.css";
import PT from "prop-types";
import Loader from "./Loader";

const Homepage = ({ articles, sortBy, sort }) => {
  if (!articles[0]) return <Loader />;
  return (
    <div>
      <h1>
        {sortBy === "votes"
          ? "Top Articles"
          : sortBy === "comments"
            ? "Most Talked About Articles"
            : "Most Recent Articles"}
      </h1>{" "}
      <button onClick={sort} className="votes" disabled={sortBy === "votes"}>
        highest scores
      </button>
      <button
        onClick={sort}
        className="comments"
        disabled={sortBy === "comments"}
      >
        most comments
      </button>
      <button
        onClick={sort}
        className="created_at"
        disabled={sortBy === "created_at"}
      >
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
                {moment(article.created_at)
                  .format("ddd DD MMM YYYY ")
                  .toString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Homepage.propTypes = {
  sortBy: PT.string.isRequired,
  articles: PT.array.isRequired,
  sort: PT.func.isRequired
};

export default Homepage;
