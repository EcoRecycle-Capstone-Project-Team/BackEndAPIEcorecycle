const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/register",
    [verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post("/api/auth/login", controller.signin);
};
