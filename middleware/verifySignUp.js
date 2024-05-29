const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    if (!req.body.email) {
      const errors = {};
      errors.email = "Email tidak boleh kosong";
      return res.status(400).send({ message: errors });
    }

    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).send({
        message: "Email bisa digunakan",
      });
    }

    return res.status(200).send({
      isunique: false,
      user: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
