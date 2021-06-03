import React from "react";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Registration({ form }) {
  return (
    <form className={form} action="/user/registration" method="POST">
      <Typography variant="h4" color="primary">
        Registration Form
      </Typography>
      <TextField
        type="text"
        name="username"
        placeholder="Username ..."
        label="Username"
      />
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
        You already have an account ? Login
        <Link to="authentication?method=login"> Here</Link>
      </Typography>
      <Button type="submit" variant="contained" color="secondary" size="large">
        Register
      </Button>
    </form>
  );
}

export default Registration;
