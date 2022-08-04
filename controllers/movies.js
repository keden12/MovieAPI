import fs from 'fs';
import Joi from 'joi';

export const addMovie = (req, res) => {

    const rawData = fs.readFileSync('./data/db.json');
    const parsedData = JSON.parse(rawData);

    const movies = parsedData.movies;
    const genres = parsedData.genres;

    let movie = req.body;

    // using Joi for error checking 
    const schema = Joi.object({
        genres: Joi.array().unique().items(Joi.string().valid(...genres)).required(),
        title: Joi.string().max(255).required(),
        year: Joi.number().required(),
        runtime: Joi.number().required(),
        director: Joi.string().max(255).required(),
        actors: Joi.string(),
        plot: Joi.string(),
        posterUrl: Joi.string()
    });

    const result = schema.validate(movie);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //assigning new ID
    movie.id = movies.length + 1;
    
    //pushing the new movie
    parsedData.movies.push(movie);
    
    fs.writeFile("./data/db.json", JSON.stringify(parsedData, null, 4), { encoding: 'utf8', flag: 'w'}, function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

    res.send('Movie has been added successfully');
}



