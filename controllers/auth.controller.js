const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      const errors = {};

      if (!req.body.email) {
        errors.email = "Email tidak boleh kosong";
      }

      if (!req.body.password) {
        errors.password = "Password tidak boleh kosong";
      }

      if (!req.body.username) {
        errors.username = "Username tidak boleh kosong";
      }

      return res.status(400).send({ message: errors });
    }

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) {
        const token = jwt.sign({ id: user.id }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400,
        });

        return res.status(200).send({
          status: "success",
          message: "User created successfully",
          data: {
            user: {
              id: user.id,
              name: user.username,
              email: user.email,
            },
          },
        });
      }
    } else {
      const result = user.setRoles([1]);
      if (result) {
        const token = jwt.sign({ id: user.id }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400,
        });

        return res.status(200).send({
          status: "success",
          message: "User created successfully",
          data: {
            user: {
              id: user.id,
              name: user.username,
              email: user.email,
            },
          },
        });
      }
    }

    res.status(500).send({ message: "Gagal mendaftarkan pengguna" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      const errors = {};

      if (!req.body.email) {
        errors.email = "Email tidak boleh kosong";
      }

      if (!req.body.password) {
        errors.password = "Password tidak boleh kosong";
      }

      return res.status(400).send({ message: errors });
    }

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Email Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        status: "fail",
        message: "Infalid Password",
        data: {},
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      status: "success",
      message: "Login successfully",
      data: {
        user: {
          name: user.username,
        },
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
