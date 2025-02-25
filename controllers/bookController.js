const connection = require("../data/db_books");

// INDEX
const index = (req, res) => {
  const sql = `SELECT * FROM books`;

  connection.execute(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Query Error", message: "Database query failed" });
    }
    res.json(results);
  });
};

// SHOW
const show = (req, res) => {
  const { id } = req.params;

  //   Book
  const bookSql = `SELECT * FROM books WHERE id = ?`;

  connection.execute(bookSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${bookSql}`,
      });
    }

    const book = results[0];

    if (!book) {
      return res.status(404).json({
        error: "Not found",
        message: "Libro non trovato",
      });
    }

    // Reviews
    const reviewsSql = `SELECT * FROM reviews WHERE book_id = ?`;

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Query Error",
          message: `Database query failed: ${reviewsSql}`,
        });
      }
      book.reviews = results;
      res.json(book);
    });
  });
};

module.exports = { index, show };
