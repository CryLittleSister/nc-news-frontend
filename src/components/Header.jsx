import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/">
        {" "}
        <img
          src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
          className="App-logo"
          alt="northcoders logo"
        />
      </Link>

      <Link className="link" to="/articles">
        <h1 className="App-title">News</h1>
      </Link>
    </header>
  );
};

export default Header;
