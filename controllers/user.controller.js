const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "User not found.",
        data: {},
      });
    }

    res.status(200).send({
      status: "success",
      message: "User retrieved successfully",
      data: {
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
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
