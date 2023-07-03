const createError = require("http-errors");
const eventService = require("./event.service");
const logger = require("../../config/logger");

exports.create = async (req, res, next) => {
  try {
    const savedEvent = await eventService.create(req.body);
    logger.info(`New event saved`);
    res.status(201).json(savedEvent);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Event could not saved"));
  }
};

exports.findAll = async (req, res, next) => {
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }`
  );
  try {
    const eventList = await eventService.findAll();
    res.json(eventList);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.findById = async (req, res, next) => {
  const eventId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one event with id: ${eventId}`
  );

  try {
    let event = await eventService.findById(eventId);
    logger.info(event);

    if (!event)
      return next(
        new createError.NotFound(`Event with ${eventId} was not found!`)
      );
    res.json(event);
  } catch (err) {
    logger.error(err);
    if (err.kind === "ObjectId")
      return next(new createError.BadRequest(`Invalid ObjectID: ${eventId}`));
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.update = async (req, res, next) => {
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const eventId = req.params.id;

  try {
    const updatedEvent = await eventService.update(eventId, req.body);
    res.json(updatedEvent);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not updated"));
  }
};

exports.delete = async (req, res, next) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await eventService.delete(eventId);
    res.json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
