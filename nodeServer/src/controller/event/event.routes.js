const express = require("express");
const router = express.Router();
const authenticate = require("../../auth/authenticate");
const adminOnly = require("../../auth/adminOnly");

const eventController = require("./event.controller");

router.post("/", (req, res, next) => {
  return eventController.create(req, res, next);
});

router.get("/", (req, res, next) => {
  return eventController.findAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return eventController.findById(req, res, next);
});

router.put("/:id", (req, res, next) => {
  return eventController.update(req, res, next);
});

router.delete("/:id", authenticate, adminOnly, (req, res, next) => {
  return eventController.delete(req, res, next);
});

module.exports = router;
