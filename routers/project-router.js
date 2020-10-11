const express = require("express");
const proj = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, world!",
  });
});

router.get("/projects", async (req, res) => {
  const id = req.params.id;
  const projects = await proj.get();
  console.log(projects);
  res.status(200).json(projects);
});

router.get("/projects/:id", async (req, res) => {
  const id = req.params.id;
  const project = await proj.get(id);
  if (!project) {
    res.status(404).json({
      errorMessage: "The project with the specified ID does not exist.",
    });
  } else if (project) {
    res.status(200).json(project);
  } else {
    res.status(500).json({
      erroMessage: "The project information could not be retrieved.",
    });
  }
});

router.get("/projects/:id/actions", async (req, res) => {
  const id = req.params.id;
  const project = await proj.get(id);
  if (!project) {
    res.status(404).json({
      errorMessage: "The project with the specified does not exist.",
    });
  } else if (project) {
    const projActs = await proj.getProjectActions(project.id);
    res.status(200).json(projActs);
  } else {
    res.status(500).json({
      errorMessage: "The project information could not be retrieved.",
    });
  }
});

router.post("/projects", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(404).json({
      errorMessage: "Please provide a name and description for the project.",
    });
  } else if (name && description) {
    const newProject = {
      name: name,
      description: description,
    };
    const result = await proj.insert(newProject);
    res.status(201).json(result);
  }
});

router.delete("/projects/:id", async (req, res) => {
  const id = req.params.id;
  const project = await proj.get(id);
  console.log(project);
  if (!project) {
    res.status(404).json({
      errorMessage: "The project with the specified ID does not exist.",
    });
  } else if (project) {
    const count = await proj.remove(project.id);
    res.status(200).json({
      message: `${count} file(s) removed`,
    });
  } else {
    res.status(500).json({
      errorMessage: "The user could not be removed.",
    });
  }
});

router.put("/projects/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      errorMessage:
        "Please provide a name and a description for the project being updated.",
    });
  } else {
    const updates = await proj.update(id, {
      name: name,
      description: description,
    });
    if (!updates) {
      res.status(404).json({
        errorMessage: "The project with the specified ID does not exist.",
      });
    } else if (updates) {
      res.status(200).json(updates);
    } else {
      es.status(500).json({
        errorMessage: "The project information could not be updated.",
      });
    }
  }
});

module.exports = router;
