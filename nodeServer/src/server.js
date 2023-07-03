const express = require("express");
const logger = require("./config/logger");
const cors = require("cors");
const authenticate = require("./auth/authenticate");
const adminOnly = require("./auth/adminOnly");
const { join } = require("path");
const authHandler = require("./auth/authHandler");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

const angularPath = join(__dirname, "..", "public", "angular");

const app = express();
const apiWrapper = express();

apiWrapper.use("/api", app);
apiWrapper.use("/", express.static(angularPath));

app.use(express.json());
//app.use(cors());

app.use("/users", require("./controller/user/user.routes"));
app.use("/articles", require("./controller/article/article.routes"));
app.use("/streams", require("./controller/stream/stream.routes"));
app.use("/events", require("./controller/event/event.routes"));

app.post("/login", authHandler.login);
app.post("/logout", authHandler.logout);
app.post("/refresh", authHandler.refresh);
app.get("/me", authHandler.me);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiWrapper.get("*", (req, res) => {
  res.sendFile(join(angularPath, "index.html"));
});

app.use((err, req, res, next) => {
  logger.error(`ERROR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
});

module.exports = apiWrapper;
