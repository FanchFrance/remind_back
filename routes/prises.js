const express = require("express");
const router = express.Router();
const connection = require("../config");

//Retrieve all prise
router.get("/", (req, res) => {
  connection.query("SELECT * FROM prise", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Retrieve a prise
router.get("/:id", (req, res) => {
  const idParams = req.params.id;

  connection.query(
    "SELECT * FROM prise WHERE id = ?",
    [idParams],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

//Create a prise
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO prise SET ?", [formData], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

//Update a prise
router.put("/:id", (req, res) => {
  const idParams = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE prise SET ? WHERE id = ?",
    [formData, idParams],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

//Delete a prise
router.delete("/:id", (req, res) => {
  const idParams = req.params.id;
  connection.query(
    "DELETE FROM prise WHERE id = ?",
    [idParams],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
