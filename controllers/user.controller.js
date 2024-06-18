const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const upload = require("../config/multer-config");
const multer = require("multer");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: {
        model: db.role,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "User not found.",
        data: {},
      });
    }

    const userRoles = user.roles.map((role) => role.name);

    res.status(200).send({
      status: "success",
      message: "User retrieved successfully",
      data: {
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
          phone_number: user.phone_number,
          profile_photo: user.profile_photo,
          tanggal_lahir: user.tanggal_lahir,
          jenis_kelamin: user.jenis_kelamin,
          alamat: user.alamat,
          roles: userRoles,
        },
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.status(200).json({
      status: "success",
      message: "All users retrieved successfully",
      data: {
        users: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch users",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({
        status: "fail",
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    await user.update({ password: hashedPassword });

    res.status(200).json({
      status: "success",
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to update password.",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "d3152bd8cff716",
        pass: "6430dc434a4d0d",
      },
    });

    const mailOptions = {
      from: '"No Reply" <hi@demomailtrap.com>',
      to: user.email,
      subject: "Reset Password",
      text: `Dear user, click the following link to reset your password: http://yourfrontend.com/reset-password?token`,
      html: `<p>Dear user, click the following link to reset your password: <a href="http://yourfrontend.com/reset-password?token=${resetToken}">Reset Password</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          status: "error",
          message: "Unable to send reset password email.",
          error: error.message,
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          status: "success",
          message: "Reset password email sent successfully.",
        });
      }
    });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    res.status(500).json({
      status: "error",
      message: "Unable to process forgot password request.",
      error: error.message,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  upload.single("profile_photo")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        status: "error",
        message: "Multer error occurred when uploading.",
        error: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        status: "error",
        message: "An unknown error occurred when uploading.",
        error: err.message,
      });
    }

    const { username, phone_number, tanggal_lahir, jenis_kelamin, alamat } =
      req.body;

    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found.",
        });
      }

      let profilePhotoPath;
      if (user.profile_photo) {
        profilePhotoPath = path.join("public", "img", user.profile_photo);
      }

      let profile_photo = user.profile_photo;
      if (req.file) {
        if (profilePhotoPath && fs.existsSync(profilePhotoPath)) {
          fs.unlinkSync(profilePhotoPath);
        }
        profile_photo = req.file.filename;
      }

      await user.update({
        username: username || user.username,
        phone_number: phone_number || user.phone_number,
        profile_photo: profile_photo,
        tanggal_lahir: tanggal_lahir || user.tanggal_lahir,
        jenis_kelamin: jenis_kelamin || user.jenis_kelamin,
        alamat: alamat || user.alamat,
      });

      res.status(200).json({
        status: "success",
        message: "Profile updated successfully.",
        data: {
          user: {
            id: user.id,
            name: user.username,
            email: user.email,
            phone_number: user.phone_number,
            profile_photo: user.profile_photo,
            tanggal_lahir: user.tanggal_lahir,
            jenis_kelamin: user.jenis_kelamin,
            alamat: user.alamat,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Unable to update profile.",
        error: error.message,
      });
    }
  });
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    if (user.profile_photo) {
      const profilePhotoPath = path.join("public", "img", user.profile_photo);
      if (fs.existsSync(profilePhotoPath)) {
        fs.unlinkSync(profilePhotoPath);
      }
    }

    await user.destroy();

    res.status(200).json({
      status: "success",
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to delete user.",
      error: error.message,
    });
  }
};
