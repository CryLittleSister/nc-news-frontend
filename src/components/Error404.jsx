import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error">
      <Link to="/">
        {" "}
        <img
          id="error404"
          src="https://cdn.dribbble.com/users/183518/screenshots/1766471/agigen-404.gif"
          alt="404 error"
        />
      </Link>
    </div>
  );
};

export default Error404;
