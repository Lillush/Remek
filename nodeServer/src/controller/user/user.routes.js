const express = require("express");
const router = express.Router();
const authenticate = require("../../auth/authenticate");
const adminOnly = require("../../auth/adminOnly");

const userController = require("./user.controller");

router.post("/", (req, res, next) => {
  return userController.create(req, res, next);
});

router.get("/", (req, res, next) => {
  return userController.findAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return userController.findById(req, res, next);
});

router.put("/:id", (req, res, next) => {
  return userController.update(req, res, next);
});

router.delete("/:id", authenticate, adminOnly, (req, res, next) => {
  return userController.delete(req, res, next);
});

module.exports = router;
