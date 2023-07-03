const Event = require("../../models/event.model");
const logger = require("../../config/logger");

exports.create = (event) => {
  const newEvent = new Event(event);
  return newEvent.save();
};

exports.findAll = () => Event.find();

exports.findById = (id) => Event.findById(id);

exports.update = (id, eventData) =>
  Event.findByIdAndUpdate(id, eventData, { new: true });

exports.delete = (id) => Event.findByIdAndRemove(id);
