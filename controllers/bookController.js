const connection = require("../data/db_books");

// INDEX
const index = (req, res) => {
  const sql = "SELECT * FROM books";

  connection.execute(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Query Error", message: "Database query failed" });
    }
    res.json(results);
  });
};

module.exports = { index };
