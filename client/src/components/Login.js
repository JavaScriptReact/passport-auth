import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Login({ form }) {
  return (
    <form className={form} action="/user/login" method="POST">
      <Typography variant="h4" color="primary">
        Login Form
      </Typography>
      <TextField
        type="email"
        name="email"
        placeholder="Email ..."
        label="Email"
      />
      <TextField
        type="password"
        name="password"
        placeholder="Password ..."
        label="Password"
      />
      <Typography variant="h6">
        You aren't registered. Register
        <Link to="/authentication?method=registration"> Here</Link>
      </Typography>
      <form action="/auth/facebook" method="GET">
        <Button type="submit" variant="contained" color="primary" size="large">
          Login With Facebook
        </Button>
      </form>
      <Button type="submit" variant="contained" color="secondary" size="large">
        Login
      </Button>
    </form>
  );
}

export default Login;
