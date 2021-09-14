"use strict";
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
    // thumbnail: { type: String, required: true },
    mimetype: { type: String, required: true },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Album",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  }
);

schema.statics.list = function (query, { start, limit }) {
  var File = this;
  return new Promise((resolve, reject) => {
    File.aggregate([
      {
        $facet: {
          data: [
            { $match: query },
            {
              $skip: start,
            },
            {
              $limit: limit,
            },
          ],
          summary: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ])
      .then((d) => {
        if (d[0].summary.length > 0)
          resolve({
            total: d[0].summary[0].count,
            limit,
            start,
            data: d[0].data,
          });
        else
          resolve({
            total: 0,
            limit,
            start,
            data: [],
          });
      })
      .catch((e) => reject(e));
  });
};

module.exports = mongoose.model("File", schema);
