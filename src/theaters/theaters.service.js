const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
});

function list() {
  return knex("theaters")
    .join("movies_theaters as mt", "mt.theater_id", "theaters.theater_id")
    .join("movies", "movies.movie_id", "mt.movie_id")
    .select("*")
    .then(reduceMovies);
}

module.exports = {
  list,
};