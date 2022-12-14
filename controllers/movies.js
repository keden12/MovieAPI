import fs from 'fs';
import Joi from 'joi';

function getRandomMovie(movies) {
  const random = Math.floor(Math.random() * movies.length);
  return movies[random];
}

function filterMoviesByDuration(movies, duration) {
  return movies.filter((movie) => parseInt(movie.runtime) > (parseInt(duration) - 10) && parseInt(movie.runtime) < (parseInt(duration) + 10));
}

function filterMoviesByGenres(movies, queryGenres) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    let score = 0;
    let matches = 0;

    // Checking if there is more than one values for genres
    if (!Array.isArray(queryGenres)) {
      if (movie.genres.includes(queryGenres)) {
        matches++;
      }
    } else {
      // calculate score for each result
      queryGenres.forEach((element, index) => {
        if (movie.genres.includes(element)) {
          score += (queryGenres.length - index);
          matches++;
        }
      });
    }

    // apply bonus score for the amount of matches - this is to eliminate conflicts with having the same score but different amount of matches
    score += matches;

    movies[i].score = score;
  }

  // sort by score in descending order
  movies.sort((a, b) => b.score - a.score);

  // get only the movies that have a score greater than 0
  movies = movies.filter((movie) => movie.score > 0);

  // remove the score attribute
  movies.forEach((movie, index) => { delete movie.score; });

  return movies;
}

function getParsedData() {
  const rawData = fs.readFileSync('./data/db.json');
  const parsedData = JSON.parse(rawData);
  return parsedData;
}

export const addMovie = (req, res) => {
  // getting the parsed data
  const parsedData = getParsedData();

  // getting movies and genres data
  const { movies } = parsedData;
  const { genres } = parsedData;

  // getting the movie details
  const movie = req.body;

  // using Joi for error checking
  const schema = Joi.object({
    genres: Joi.array().unique().items(Joi.string().valid(...genres)).required(),
    title: Joi.string().max(255).required(),
    year: Joi.number().required(),
    runtime: Joi.number().required(),
    director: Joi.string().max(255).required(),
    actors: Joi.string(),
    plot: Joi.string(),
    posterUrl: Joi.string(),
  });

  const result = schema.validate(movie);
  if (result.error) {
    res.status(400).send({ error: result.error.details[0].message });
    return;
  }

  // assigning new ID
  movie.id = movies.length + 1;

  // pushing the new movie
  parsedData.movies.push(movie);

  fs.writeFile('./data/db.json', JSON.stringify(parsedData, null, 4), { encoding: 'utf8', flag: 'w' }, (err) => {
    if (err) {
      const message = 'An error occured while writing JSON Object to File.';
      res.status(500).send({ error: message });
      return console.log(err);
    }

    // console.log("JSON file has been saved.");
  });

  res.status(201).send({ movies: movie });
};

export const getMovie = (req, res) => {
  // getting the parsed data
  const parsedData = getParsedData();

  const { movies } = parsedData;
  const { genres } = parsedData;

  let randomMovie = [];

  // using Joi for error checking
  const schema = Joi.object({
    genres: [
      Joi.array().unique().items(Joi.string().valid(...genres)),
      Joi.string().valid(...genres),
    ],
    duration: Joi.number().min(10),
  });

  // checking the query parameters
  const result = schema.validate(req.query);
  if (result.error) {
    res.status(400).send({ error: result.error.details[0].message });
    return;
  }

  // If no query parameters have been added, send a random movie
  if (!req.query.genres && !req.query.duration) {
    randomMovie = getRandomMovie(movies);
    res.send({ movies: [randomMovie] });
    return;
  }

  // If there is only a duration parameter
  if (req.query.duration && !req.query.genres) {
    const moviesWithinRange = filterMoviesByDuration(movies, req.query.duration);
    randomMovie = getRandomMovie(moviesWithinRange);
    res.send({ movies: [randomMovie] });
    return;
  }

  // If there is only a genres parameter
  if (req.query.genres && !req.query.duration) {
    const filteredMoviesByGenres = filterMoviesByGenres(movies, req.query.genres);
    res.send({ movies: filteredMoviesByGenres });
    return;
  }

  // If both parameters are present
  if (req.query.genres && req.query.duration) {
    const moviesWithinRange = filterMoviesByDuration(movies, req.query.duration);
    const filteredMovies = filterMoviesByGenres(moviesWithinRange, req.query.genres);
    res.send({ movies: filteredMovies });
  }
};
