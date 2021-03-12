// Write your "projects" router here!
const express = require("express");

const router = express.Router();

const Action = require("./actions-model");

// ACTIONS ENDPOINTS  ------------------->>>>

// [GET] /api/actions

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
