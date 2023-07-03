const createError = require("http-errors");
const userService = require("./user.service");
const logger = require("../../config/logger");

exports.create = async (req, res, next) => {
  try {
    const savedUser = await userService.create(req.body);
    logger.info(`New user saved`);
    res.json(savedUser).status(201);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("User could not saved"));
  }
};

exports.findAll = async (req, res, next) => {
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }`
  );
  try {
    const userList = await userService.findAll();
    res.json(userList);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.findById = async (req, res, next) => {
  const userId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one user with id: ${userId}`
  );

  try {
    let user = await userService.findById(userId);
    logger.info(user);

    if (!user)
      return next(
        new createError.NotFound(`User with ${userId} was not found!`)
      );
    res.json(user);
  } catch (err) {
    logger.error(err);
    if (err.kind === "ObjectId") {
      return next(new createError.BadRequest(`Invalid ObjectID: ${userId}`));
    }
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.update = async (req, res, next) => {
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const userId = req.params.id;

  try {
    const updatedUser = await userService.update(userId, req.body);
    res.json(updatedUser).status(200);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not updated"));
  }
};

exports.delete = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await userService.delete(userId);
    res.json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
