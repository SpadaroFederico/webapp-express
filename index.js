require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moviesRoutes = require("./src/routes/moviesRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotte
app.use("/movies", moviesRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
