const Stream = require("../../models/stream.model");
const logger = require("../../config/logger");

exports.create = (stream) => {
  const newStream = new Stream(stream);
  return newStream.save();
};

exports.findAll = () => Stream.find();

exports.findById = (id) => Stream.findById(id);

exports.update = (id, streamData) =>
  Stream.findByIdAndUpdate(id, streamData, { new: true });

exports.delete = (id) => Stream.findByIdAndRemove(id);
