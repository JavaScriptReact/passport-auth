const router = require("express").Router();
const passport = require("passport");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
}

router.get(
  "/",
  checkAuthenticated,
  passport.authenticate("facebook", {
    scope: [
      "email",
      "user_posts",
      "user_birthday",
      "user_location",
      "user_gender",
      "user_hometown",
      "user_location",
      "user_link",
      "user_likes",
      "user_friends",
    ],
  })
);

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/authentication?method=login",
  }),
  (req, res) => {
    console.log(req.cookies);
    res.redirect("/dashboard");
  }
);

router.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

module.exports = router;
