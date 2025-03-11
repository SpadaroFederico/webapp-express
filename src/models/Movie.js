const db = require("../config/db");

const Movie = {
  //  Ottiene tutti i film
  getAllMovies: (callback) => {
    db.query("SELECT * FROM movies", callback);
  },

  //  Ottiene un singolo film con le recensioni
  getMovieById: (id, callback) => {
    const query = `
      SELECT m.*, r.id AS review_id, r.name, r.vote, r.text
      FROM movies m
      LEFT JOIN reviews r ON m.id = r.movie_id
      WHERE m.id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      const movie = {
        id: results[0].id,
        title: results[0].title,
        director: results[0].director,
        genre: results[0].genre,
        release_year: results[0].release_year,
        abstract: results[0].abstract,
        image: results[0].image,
        reviews: results
          .filter((row) => row.review_id !== null)
          .map((row) => ({
            id: row.review_id,
            name: row.name,
            vote: row.vote,
            text: row.text,
          })),
      };

      return callback(null, movie);
    });
  },
};

module.exports = Movie;
