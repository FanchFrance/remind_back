const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM patient", (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      return res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM patient WHERE id = ?",
    req.params.id,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }

      if (results.length === 0) {
        return res.send("L'utilisateur n'a pas pu etre trouvé");
      }

      return res.json(results[0]);
    }
  );
});

module.exports = router;
