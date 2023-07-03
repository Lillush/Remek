const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const userDB = require("../models/user.model");
const logger = require("../config/logger");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Missing email or password");
    }
    const user = await userDB.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const userRole = {
      _id: user._id,
      role: user.role,
      nickName: user.nickName,
    };

    const accessToken = jwt.sign({ user }, config.jwt_secret_key, {
      expiresIn: config.access_token_expiry,
    });

    res.json({ accessToken, user: userRole });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
