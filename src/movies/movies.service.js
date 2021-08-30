const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function list() {
    return knex("movies").select("*");
};

function inTheatersNow() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id");
};

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movieId })
        .first();
};

function theaterPlayingMovie(movieId) {
    return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ movie_id: movieId, is_showing: true });
}

function listReviews(movieId) {
    return knex("movies as m")
        .join("reviews as r", "m.movie_id", "r.movie_id")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({"r.movie_id": movieId})
        .then((reviews) => {
            const includeCriticDetails = [];
            reviews.forEach((review) => {
                const critic = addCritic(review);
                includeCriticDetails.push(critic);
            });
            return includeCriticDetails;
        });
};

module.exports = {
    list,
    inTheatersNow,
    read,
    theaterPlayingMovie,
    listReviews,
};