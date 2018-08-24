import React from "react";
import { Link } from "react-router-dom";

const Error400 = () => {
  return (
    <div className="error">
      <Link to="/">
        {" "}
        <img
          id="error404"
          src="https://i2.wp.com/errorcodespro.com/wp-content/uploads/2016/12/error400Badrequest.jpg?fit=550%2C550&ssl=1"
          alt="404 error"
        />
      </Link>
    </div>
  );
};

export default Error400;
