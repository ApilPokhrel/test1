const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const errorHandler = require("./handler/Error");
const routes = require("./Routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs");

// app.use(express.static(path.join(__dirname, "/../uploads")));

app.use(cors());
app.use(helmet());
app.use(compression());
app.set("trust proxy", true);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/v1", routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.use(errorHandler.notFound);

app.use(errorHandler.productionErrors);

module.exports = app;
