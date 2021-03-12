// Write your "projects" router here!
const express = require("express");

const router = express.Router();

const Project = require("./projects-model");

// PROJECTS ENDPOINTS  -------------------->>>>

// [GET] /api/projects

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
