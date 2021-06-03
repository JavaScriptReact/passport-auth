import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app";

function Application() {
  return (
    <Router>
      <App />
    </Router>
  );
}

ReactDom.render(
  <>
    <Application />
  </>,
  document.getElementById("root")
);
