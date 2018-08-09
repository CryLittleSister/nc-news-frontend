import React from "react";

const Login = ({ handleLogin, handleChange }) => {
  return (
    <div>
      <form>
        <input
          type="text"
          id="username"
          placeholder="enter username"
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          placeholder="enter password"
          onChange={handleChange}
        />
        <button onClick={handleLogin}>log in</button>
        {/* <button>create new user</button> */}
      </form>
    </div>
  );
};

export default Login;
