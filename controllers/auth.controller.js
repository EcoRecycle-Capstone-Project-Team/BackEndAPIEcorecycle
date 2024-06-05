const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, password, username, roles } = req.body;
    const errors = {};

    if (!username) {
      return res.status(400).send({
        status: "fail",
        message: "Nama tidak boleh kosong",
        data: {},
      });
    }

    if (!email) {
      return res.status(400).send({
        status: "fail",
        message: "Email tidak boleh kosong",
        data: {},
      });
    }

    if (!password) {
      return res.status(400).send({
        status: "fail",
        message: "Password tidak boleh kosong",
        data: {},
      });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).send({
        status: "fail",
        message: "Validation errors",
        data: errors,
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email sudah digunakan",
        data: {},
      });
    }

    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    let result;
    if (roles) {
      const rolesArray = Array.isArray(roles) ? roles : [roles];
      const rolesData = await Role.findAll({
        where: { id: { [Op.or]: rolesArray } },
      });
      result = await user.setRoles(rolesData);
    } else {
      result = await user.setRoles([3]);
    }

    if (result) {
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

      return res.status(200).send({
        status: "success",
        message: "User created",
        data: {
          user: {
            id: user.id,
            name: user.username,
            email: user.email,
          },
          token,
        },
      });
    }

    res.status(500).send({
      status: "fail",
      message: "Gagal mendaftarkan pengguna",
      data: {},
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: error.message,
      data: {},
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({
        status: "fail",
        message: "Email tidak boleh kosong",
        data: {},
      });
    }

    if (!password) {
      return res.status(400).send({
        status: "fail",
        message: "Password tidak boleh kosong",
        data: {},
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "Email tidak ditemukan",
        data: {},
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        status: "fail",
        message: "Password tidak valid",
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
      message: "Login berhasil",
      data: {
        user: {
          name: user.username,
        },
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: "fail",
      message: error.message,
      data: {},
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      status: "success",
      message: "Anda telah keluar!",
      data: {},
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: err.message,
      data: {},
    });
  }
};
