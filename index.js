const express = require("express");

const logger = require("./middleware/logger");
const projects = require("./routers/project-router");
const actions = require("./routers/action-router");

const port = process.env.PORT || 9999;
const server = express();

server.use(express.json());
server.use(logger("short"));
server.use(actions);
server.use(projects);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
