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

//[GET] /api/projects/:id

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Project.get(id)
    .then((projects) => {
      if (!projects) {
        res
          .status(404)
          .json({ message: "The user with the specified id does not exist" });
      } else {
        res.json(projects);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// [POST] /api/projects

router.post("/", (req, res) => {
  const newProject = req.body;

  if (!newProject.name || !newProject.description) {
    res
      .status(400)
      .json({ message: "Please provide name and description for new project" });
  } else {
    Project.insert(newProject)
      .then((project) => {
        res.json(project);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
});

// [PUT] /api/projects/:id

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    if (!changes.name || !changes.description) {
      res
        .status(400)
        .json({ message: "Please provide name and description for project" });
    } else {
      const updateProject = await Project.update(id, changes);
      if (!updateProject) {
        res
          .status(404)
          .json({ message: `Project with the id of ${id} does not exist` });
      } else {
        res.json(updateProject);
      }
    }
  } catch {
    res.status(500).json({ message: "" });
  }
});

module.exports = router;
