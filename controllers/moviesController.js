const connection = require("../data/db_movies");

// INDEX
const index = (req, res) => {
  const sql = `
  SELECT movies.*, ROUND(AVG(reviews.vote)) as avg_vote
  FROM movies
  LEFT JOIN reviews ON movies.id = reviews.movie_id
  GROUP BY movies.id
  `;

  connection.execute(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Query Error", message: "Database query failed" });
    }

    const movies = results.map((movie) => {
      movie.image = `${process.env.BE_URL}/img/${movie.image}`;
      return movie;
    });

    res.json(movies);
  });
};

// SHOW
const show = (req, res) => {
  const { id } = req.params;

  // Movie
  const movieSql = `
  SELECT movies.*, ROUND(AVG(reviews.vote)) AS avg_vote
  FROM movies
  LEFT JOIN reviews ON movies.id = reviews.movie_id
  WHERE movies.id = ?
  GROUP BY movies.id;
  `;

  connection.execute(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${movieSql}`,
      });
    }

    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: "Film non trovato",
      });
    }

    movie.image = `${process.env.BE_URL}/img/${movie.image}`;

    // Reviews
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Query Error",
          message: `Database query failed: ${reviewsSql}`,
        });
      }
      movie.reviews = results;
      res.json(movie);
    });
  });
};

//Store Review
const storeReview = (req, res) => {
  const { id } = req.params;
  // Recupero il body della richiesta
  const { name, vote, text } = req.body;

  // Preparare query di inserimento
  const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`;

  //Eseguire la query
  connection.execute(sql, [id, name, vote, text], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }
    // Rispondere al client
    res.status(201).json({ id: results.insertId });
  });
};

module.exports = { index, show, storeReview };
