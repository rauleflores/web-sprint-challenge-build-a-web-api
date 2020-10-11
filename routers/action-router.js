const express = require("express");
const act = require("../data/helpers/actionModel");

const router = express.Router();

router.get("//", (req, res) => {
  res.status(200).json({
    message: "Hello, world!",
  });
});

router.get("/projects/actions", async (req, res) => {
  const actions = await act.get();
  console.log(actions);
  if (actions) {
    res.status(200).json(actions);
  } else {
    res.status(500).json({
      errorMessage: "The actions information could not be retrieved.",
    });
  }
});

router.get("/projects/actions/:id", async (req, res) => {
  const id = req.params.id;
  const action = await act.get(id);
  if (!action) {
    res.status(404).json({
      errorMessage: "The action with the specified ID does not exist.",
    });
  } else if (action) {
    res.status(200).json(action);
  } else {
    res.status(500).json({
      errorMessage: "The action information could not be retrieved.",
    });
  }
});

router.post("/projects/:id/actions", async (req, res) => {
  const id = req.params.id;
  const { description, notes } = req.body;
  if (!description || !notes) {
    res.status(400).json({
      errorMessage:
        "Please provide a description and some notes about the action.",
    });
  } else if (description && notes) {
    const newAction = {
      project_id: id,
      description: description,
      notes: notes,
    };
    const added = await act.insert(newAction);
    res.status(201).json(added);
  } else {
    res.status(500).json({
      errorMessage: "The action could not be added.",
    });
  }
});

router.put("/projects/actions/:id", async (req, res) => {
  const id = req.params.id;
  const action = await act.get(id);
  if (!action) {
    res.status(404).json({
      errorMessage: "The action with the specified ID does not exist.",
    });
  } else if (action) {
    const { description, notes } = req.body;
    if (!description || !notes) {
      res.status(400).json({
        errorMessage:
          "Please provide a description and some notes for the action being updated.",
      });
    } else {
      const updatedAction = {
        description: description,
        notes: notes,
      };
      const updates = await act.update(id, updatedAction);
      res.status(200).json(updates);
    }
  }
});

router.delete("/projects/actions/:id", async (req, res) => {
  const id = req.params.id;
  const action = await act.get(id);
  if (!action) {
    res.status(404).json({
      errorMessage: "The action with the specified ID does not exist.",
    });
  } else if (action) {
    const removed = await act.remove(id);
    res.status(200).json(`${removed} file(s) removed.`);
  } else {
    res.status(500).json({
      errorMessage: "The aciton could not be removed.",
    });
  }
});

module.exports = router;
