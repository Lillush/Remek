const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      validate: {
        validator: function (v) {
          return /^[A-Ű][A-Űa-Ű .]{3,24}$/.test(v);
        },
      },
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    nickName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]{3,24}$/.test(v);
        },
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
    isStreamer: Boolean,
    role: {
      type: String,
      required: true,
    },
    mainGame: {
      type: String,
      required: false,
    },
    streamSite: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },

    streams: {
      type: [mongoose.Schema.Types.ObjectId, "Stream"],
      required: false,
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
