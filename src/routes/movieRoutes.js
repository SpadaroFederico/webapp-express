const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// Rotta per ottenere tutti i film
router.get("/", (req, res) => {
  Movie.getAllMovies((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dei film" });
    }
    res.json(results);
  });
});


module.exports = router;
