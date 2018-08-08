import React from "react";

const Login = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="enter username" />
        <input type="text" placeholder="enter password" />
        <button>log in</button>
        <button>create new user</button>
      </form>
    </div>
  );
};

export default Login;
