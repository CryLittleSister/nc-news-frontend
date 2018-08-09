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
          alt="logo"
        />
      </Link>
      <h1 className="App-title">News</h1>
      {/* Navbar to be contained in header which appears on all pages. Conditional rendering to specify which page we're on or a lower h2? */}
      <Link to="/articles">articles</Link>
    </header>
  );
};

export default Header;
