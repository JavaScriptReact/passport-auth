const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

require("./passport-config")(passport);

const userControler = require("./passport-facebook");

const mongodb_uri = require("./config").MONGODB_URI;
mongoose
  .connect(mongodb_uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."));

mongoose.connection.on("error", () =>
  console.log("Something went wrong with mongodb connection.")
);

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: require("./config").SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.get("/", (req, res) => res.redirect("/dashboard"));
app.use("/user", require("./routes/user"));
app.use("/auth/facebook", require("./routes/facebook"));

app.get("/authentication", function (req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
});

app.get("/dashboard", function (req, res, next) {
  if (!req.isAuthenticated())
    return res.redirect("/authentication?method=login");
  next();
});

app.get("/users/logout", function (req, res) {
  req.logout();
  res.redirect("/authentication?method=login");
});

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = require("./config").PORT;
server.listen(PORT, () => console.log("Server is listening on PORT ", PORT));
