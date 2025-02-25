const express = require("express");
const cors = require("cors");
const booksRouter = require("./routers/booksRouter");
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();
const { PORT, FE_URL } = process.env;

// CORS (apre la comunicazione con il FE)
app.use(
  cors({
    origin: FE_URL,
  })
);

// Middlewares globali
app.use(express.static("public")); //File statici
app.use(express.json()); //Parsing della req.body

// Routes
app.use("/books", booksRouter);

// MIddelwares gestione errori
app.use(notFound);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
