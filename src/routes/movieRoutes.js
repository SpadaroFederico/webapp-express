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

// Rotta per ottenere un singolo film con le recensioni
router.get("/:id", (req, res) => {
  const movieId = req.params.id;

  Movie.getMovieById(movieId, (err, movie) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero del film" });
    }
    if (!movie) {
      return res.status(404).json({ error: "Film non trovato" });
    }
    res.json(movie);
  });
});

module.exports = router;
