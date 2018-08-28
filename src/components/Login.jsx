import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

const Login = ({ handleLogin, handleChange }) => {
  return (
    <div>
      <form>
        <input
          autoFocus
          type="text"
          className="username"
          placeholder="enter username"
          onChange={handleChange}
        />
        <input
          type="password"
          className="password"
          placeholder="enter password"
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Log In</button>
        <Link to="/users/create">
          <button>Create New User</button>
        </Link>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleChange: PT.func.isRequired,
  handleLogin: PT.func.isRequired
};

export default Login;
