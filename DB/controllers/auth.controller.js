const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.checkPassword(password))) {
    res.status(401).json({ message: "Invalid email or password" });
  } else {
    res.status(200).json({
      message: "login success",
      token: generateToken(user),
    });
  }
};
