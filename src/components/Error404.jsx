import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Error404 = () => {
  return (
    <div className="error">
      <Link to="/">
        {" "}
        <img
          src="https://cdn.dribbble.com/users/183518/screenshots/1766471/agigen-404.gif"
          alt="404 error"
        />
      </Link>
    </div>
  );
};

export default Error404;
