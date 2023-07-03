const createError = require("http-errors");
const articleService = require("./article.service");
const logger = require("../../config/logger");

exports.create = async (req, res, next) => {
  try {
    const savedArticle = await articleService.create(req.body);
    logger.info(`New article saved`);
    res.status(201).json(savedArticle);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Article could not saved"));
  }
};

exports.findAll = async (req, res, next) => {
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }`
  );
  try {
    const articleList = await articleService.findAll();
    res.json(articleList);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.findById = async (req, res, next) => {
  const articleId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one article with id: ${articleId}`
  );

  try {
    let article = await articleService.findById(articleId);
    //logger.info(article);

    if (!article)
      return next(
        new createError.NotFound(`Article with ${articleId} was not found!`)
      );
    res.json(article);
  } catch (err) {
    logger.error(err);
    if (err.kind === "ObjectId")
      return next(new createError.BadRequest(`Invalid ObjectID: ${articleId}`));
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.update = async (req, res, next) => {
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const articleId = req.params.id;

  try {
    const updatedArticle = await articleService.update(articleId, req.body);
    res.json(updatedArticle);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not updated"));
  }
};

exports.delete = async (req, res, next) => {
  const articleId = req.params.id;
  try {
    await articleService.delete(articleId);
    res.json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
