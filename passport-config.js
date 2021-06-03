const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const userModel = require("./models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email,
      password,
      done
    ) {
      userModel
        .findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Email is not registered." });
          }
          bcrypt.compare(password, user.password, function (error, isMatch) {
            if (error)
              return done(null, false, { message: "Bad username or password" });
            if (isMatch) return done(null, user);
            else return done(null, false, { message: "Incorrect password." });
          });
        })
        .catch();
    })
  );
};
