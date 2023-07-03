const Article = require("../../models/article.model");
const logger = require("../../config/logger");

exports.create = (article) => {
  const newArticle = new Article(article);
  return newArticle.save();
};

exports.findAll = () => Article.find();

exports.findById = (id) => Article.findById(id);

exports.update = (id, articleData) =>
  Article.findByIdAndUpdate(id, articleData, { new: true });

exports.delete = (id) => Article.findByIdAndRemove(id);
