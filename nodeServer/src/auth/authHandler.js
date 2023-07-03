const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const userDB = require("../models/user.model");
const logger = require("../config/logger");

exports.login = async (req, res) => {
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

    const refreshToken = jwt.sign({ user }, config.jwt_secret_refresh_key, {
      expiresIn: config.refresh_token_expiry,
    });

    await userDB.updateOne({ email }, { $set: { refreshToken: refreshToken } });

    res.json({ accessToken, refreshToken, user: userRole });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.refresh = async (req, res, next) => {
  const refreshToken = req.body["refreshToken"];

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const foundToken = await userDB.find({ refreshToken });
  if (foundToken) {
    jwt.verify(refreshToken, config.jwt_secret_refresh_key, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign({ user }, config.jwt_secret_key, {
        expiresIn: config.access_token_expiry,
      });
      res.json({ accessToken });
    });
  }
};

exports.logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const user = await userDB.find({ refreshToken });

  if (user) {
    await userDB.updateOne({ refreshToken }, { $set: { refreshToken: "" } });
    res.status(200);
  }
};

exports.me = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];

  jwt.verify(token, config.jwt_secret_key, (err, user) => {
    if (!err) {
      res.json({ user });
    }
  });
};
