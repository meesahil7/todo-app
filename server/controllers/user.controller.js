const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 7, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send({
          message: "user-registration-successfull",
          newUser: user,
        });
      }
    });
  } catch (err) {
    res.send({ message: "cannot-register-user", error: err });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const hash = user[0].password;
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id },
            process.env.SECRET_KEY
          );
          res.send({ message: "login-successfull", token });
        } else {
          res.send({ message: "wrong-credentials", error: err });
        }
      });
    }
  } catch (err) {
    res.send({ message: "wrong-credentials", error: err });
  }
};

module.exports = { registerController, loginController };
