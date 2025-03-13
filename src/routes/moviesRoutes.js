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

// Rotta per aggiungere una recensione
router.post("/:id/reviews", (req, res) => {
  const movieId = req.params.id;
  const { name, vote, text } = req.body;

  const query = `
    INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [movieId, name, vote, text], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nell'aggiunta della recensione" });
    }
    res.status(201).json({ message: "Recensione aggiunta con successo!" });
  });
});

module.exports = router;
