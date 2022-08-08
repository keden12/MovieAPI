<h1 align="center">Hi 👋, This is MovieAPI</h1>
<h3 align="center">A simple Node.js REST API</h3>

<h3>Getting started:</h3>
<p align="left"> Run <b>npm install</b> in your terminal to install all the necessary modules
</p>
<p align="left"> Once everything is installed you can run <b>npm start</b> to run the server on port 3000
</p>
<hr>
<h3>Routes:</h3>
<p align="left"> The main route is the /api/movies route that will work for GET and POST requests
</p>
<p align="left"> Other routes should return a 404
</p>
<hr>
<h3>Examples:</h3>
<p align="left"> A GET request to <b>http://localhost:3000/api/movies</b> will return a single random movie
</p>
<p align="left"> A GET request to <b>http://localhost:3000/api/movies?duration=130</b>  will return a single random movie with the runtime between (duration - 10) and (duration + 10)
</p>
<p align="left"> A GET request to <b>http://localhost:3000/api/movies?duration=130</b>  will return a single random movie with the runtime between (duration - 10) and (duration + 10)
</p>
<p align="left"> A GET request to <b>http://localhost:3000/api/movies?genres=Family&genres=Fantasy</b>  will return all movies that contain at least one of the specified genres. Also movies will be ordered by a number of genres that match.
</p>
<p align="left"> A GET request to <b>http://localhost:3000/api/movies?genres=Family&genres=Fantasy&duration=130</b>  will return all movies that contain at least one of the specified genres. Also movies will be ordered by a number of genres that match and narrowed down by runtime to be between (duration - 10) and (duration + 10)
</p>

<p align="left"><b> Note: </b> Invalid values are checked and will return in a status 400 (bad request)
</p>


<p align="left"> A POST request to <b>http://localhost:3000/api/movies</b> will create a new movie and return the movie object
<br> The body should look like this - 
</p>

```
{
    "title": "Toy Story",
    "year": 2014,
    "genres": ["Animation","Music"],
    "runtime": 130,
    "director":"John Lasseter",
    "actors": "Frank Walsh, Emily Test, Billy Neill",
    "plot": "Testing the plot",
    "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
}
```

Format - <br>
<b>title (required, string, max 255 characters)</b><br>
<b>year (required, number)</b><br>
<b>runtime (required, number)</b><br>
<b>director (required, string, max 255 characters)</b><br>
<b>actors (optional, string)</b><br>
<b>plot (optional, string)</b><br>
<b>posterUrl (optional, string)</b><br>
<b>genres (only predefined ones from db file) (required, array of predefined strings)</b><br>

<p align="left"> Predefined genres list - </p>

```
  "genres": [
      "Comedy",
      "Fantasy",
      "Crime",
      "Drama",
      "Music",
      "Adventure",
      "History",
      "Thriller",
      "Animation",
      "Family",
      "Mystery",
      "Biography",
      "Action",
      "Film-Noir",
      "Romance",
      "Sci-Fi",
      "War",
      "Western",
      "Horror",
      "Musical",
      "Sport"
  ]
```

<p align="left"><b> Note: </b> Format is checked and will return a status 400 (bad request) if there is an error
</p>



<hr>
<h3>Tests:</h3>
<p align="left"> There are unit tests that can be run using the <b>npm test</b> command
</p>


<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://mochajs.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="mocha" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>
