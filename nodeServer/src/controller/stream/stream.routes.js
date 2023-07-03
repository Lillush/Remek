const express = require("express");
const router = express.Router();
const authenticate = require("../../auth/authenticate");

const streamController = require("./stream.controller");

router.post("/", (req, res, next) => {
  return streamController.create(req, res, next);
});

router.get("/", (req, res, next) => {
  return streamController.findAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return streamController.findById(req, res, next);
});

router.put("/:id", (req, res, next) => {
  return streamController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  return streamController.delete(req, res, next);
});

module.exports = router;
