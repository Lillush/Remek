const createError = require("http-errors");
const streamService = require("./stream.service");
const logger = require("../../config/logger");

exports.create = async (req, res, next) => {
  console.log(req.body);
  try {
    const savedStream = await streamService.create(req.body);
    console.log(savedStream);
    logger.info(`New stream saved`);
    res.status(201).json(savedStream);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Stream could not saved"));
  }
};

exports.findAll = async (req, res, next) => {
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }`
  );
  try {
    const streamList = await streamService.findAll();
    res.json(streamList);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.findById = async (req, res, next) => {
  const streamId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one stream with id: ${streamId}`
  );

  try {
    let stream = await streamService.findById(streamId);
    logger.info(stream);

    if (!stream)
      return next(
        new createError.NotFound(`Stream with ${streamId} was not found!`)
      );
    res.json(stream);
  } catch (err) {
    logger.error(err);
    if (err.kind === "ObjectId")
      return next(new createError.BadRequest(`Invalid ObjectID: ${streamId}`));
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.update = async (req, res, next) => {
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const streamId = req.params.id;

  try {
    const updatedStream = await streamService.update(streamId, req.body);
    res.json(updatedStream);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not updated"));
  }
};

exports.delete = async (req, res, next) => {
  const streamId = req.params.id;
  try {
    const deletedStream = await streamService.delete(streamId);
    res.json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
