const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genres");

async function getMovies() {
  return await Movie.find().sort("title");
}

async function getMovie(id) {
  return await Movie.findOne({ _id: id });
}

async function addMovies(movie) {
  const { error } = validate(movie);
  if (error) {
    throw new Error(error.details[0].message);
    return;
  }

  const genre = await Genre.findById(movie.genreId);
  if (!genre) {
    throw new Error(error.details[0].message);
    return;
  }
  movie.genre = {
    _id: genre._id,
    genre: genre.genre
  };
  delete movie.genreId;

  const newMovie = new Movie(movie);

  return await newMovie.save();
}

async function updateMovies(id, movie) {
  const { error } = validate(movie);
  if (error) {
    throw new Error(error.details[0].message);
    return;
  }

  const genre = await Genre.findById(movie.genreId);
  if (!genre) {
    throw new Error(error.details[0].message);
    return;
  }

  movie.genre = {
    _id: genre._id,
    genre: genre.genre
  };
  delete movie.genreId;

  const updatedMovie = await Movie.findOneAndUpdate(id, movie, { new: true });
  if (!updatedMovie) {
    throw new Error("The movie with the given ID was not found.");
    return;
  }

  return updatedMovie;
}

async function deleteMovies(id) {
  const movie = await Movie.findByIdAndRemove(id);

  if (!movie) {
    throw new Error("The movie with the given ID was not found.");
    return;
  }

  return movie;
}

module.exports.getMovies = getMovies;
module.exports.getMovie = getMovie;
module.exports.addMovies = addMovies;
module.exports.updateMovies = updateMovies;
module.exports.deleteMovies = deleteMovies;
