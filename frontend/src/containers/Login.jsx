import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo-text.png";

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const { actions } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(login);
    actions.loginWithUsernameAndPassword({username: login.username, password: login.password});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <form
      className={"flex h-[100vh] items-center justify-center"}
      noValidate
      autoComplete="off"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col gap-4 max-w-lg">
      <img src={logo} className='h-28 p-2 w-full rounded-xl object-contain bg-white' />
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={login.username}
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={login.password}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
