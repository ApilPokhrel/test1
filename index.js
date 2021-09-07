"use strict";

const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/App");

require("dotenv").config({ path: "./variables.env" });

const PORT = process.env.PORT || 3600;

const httpServer = http.createServer(app);

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.on("error", (err) => {
  console.error(`Mongodb -> 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

httpServer.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started On http://localhost:" + PORT);
  }
});
