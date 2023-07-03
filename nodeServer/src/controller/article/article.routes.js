const express = require("express");
const router = express.Router();
const authenticate = require("../../auth/authenticate");
const adminOnly = require("../../auth/adminOnly");

const articleController = require("./article.controller");

router.post("/", (req, res, next) => {
  return articleController.create(req, res, next);
});

router.get("/", (req, res, next) => {
  return articleController.findAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return articleController.findById(req, res, next);
});

router.put("/:id", (req, res, next) => {
  return articleController.update(req, res, next);
});

router.delete("/:id", authenticate, adminOnly, (req, res, next) => {
  return articleController.delete(req, res, next);
});

module.exports = router;
