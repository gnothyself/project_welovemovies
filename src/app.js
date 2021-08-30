if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router")

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
