import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Login from "../components/Login";
import Registration from "../components/Registration";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
    width: 300,
    height: 400,
    padding: "15px 10px",
    borderRadius: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    width: "100%",
  },
}));

function Authentication() {
  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();
  const method = new URLSearchParams(location.search).get("method");

  if (method !== "login" && method !== "registration") {
    history.push("/authentication?method=login");
  }

  return (
    <Paper className={classes.root} elevation={12}>
      {method === "login" && <Login form={classes.form} />}
      {method === "registration" && <Registration form={classes.form} />}
    </Paper>
  );
}

export default Authentication;
