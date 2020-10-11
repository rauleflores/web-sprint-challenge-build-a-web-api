const express = require("express");

const projects = require("./routers/project-router");

const port = process.env.PORT || 9999;
const server = express();

server.use(express.json());
server.use(projects);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
