"use strict";
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, required: true },
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
  var Album = this;
  return new Promise((resolve, reject) => {
    let table = [];
    if (query) table.push({ $match: query });
    Album.aggregate([
      {
        $facet: {
          data: [
            ...table,
            {
              $skip: start,
            },
            {
              $limit: limit,
            },
          ],
          summary: [...table, { $group: { _id: null, count: { $sum: 1 } } }],
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

module.exports = mongoose.model("Album", schema);
