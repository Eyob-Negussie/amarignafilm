const express = require("express");
const router = express.Router();
const movies = require("../controllers/movie");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const result = await movies.getMovies();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await movies.getMovie(req.params.id);
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const result = await movies.addMovies(req.body);
  res.send(result);
});

router.put("/:id", auth, async (req, res) => {
  const result = await movies.updateMovies(req.params.id, req.body);
  res.send(result);
});

router.delete("/:id", auth, async (req, res) => {
  const result = await movies.deleteMovies(req.params.id);
  res.send(result);
});

module.exports = router;
