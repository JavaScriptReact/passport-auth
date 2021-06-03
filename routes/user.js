const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user");

router.get("/current-user", function (req, res) {
  const user_id = req.session.passport.user._id;

  User.findById(user_id)
    .select("username registrated_at profile_image -_id")
    .exec(function (error, user) {
      if (error) return res.send({ error });
      res.send({ user });
    });
});

router.post("/registration", function (req, res) {
  const { username, email, password } = req.body;
  const registrated_at = new Date().getTime();

  if (username && email && password) {
    try {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) throw err;

          const newUser = new User({
            username,
            email,
            password: hashedPassword,
            registrated_at,
          });

          newUser
            .save()
            .then((result) => res.redirect("/dashboard"))
            .catch((error) => {
              throw error;
            });
        });
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  } else return res.send({ error: "Username, email and password must be specified." });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/authentication?method=login",
  })
);

module.exports = router;
