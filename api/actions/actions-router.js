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

//[GET] /api/actions/:id

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Action.get(id)
    .then((actions) => {
      if (!actions) {
        res
          .status(404)
          .json({ message: "The user with the specified id does not exist" });
      } else {
        res.json(actions);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
