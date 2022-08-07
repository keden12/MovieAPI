import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";

// Assertion style 
chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Movies API', () => {

    //Test the GET route
    describe('GET /api/movies', () => {
        it("It should return a status 404", (done) => {
            let movie = {};
            chai.request(server)
            .get('/movies')
            .end((err,response) => {
                response.should.have.status(404);
            })
            done();
        })


        it("It should get a random movie", (done) => {
            let movie = {};
            chai.request(server)
            .get('/api/movies')
            .end((err,response) => {
                response.should.have.status(200);
                response.body.movies.should.be.a('array')
                movie = response.body.movies;
            })
            chai.request(server)
            .get('/api/movies')
            .end((err,response) => {
                response.should.have.status(200);
                response.body.movies.should.be.a('array')
                response.body.movies.should.not.eq(movie);
            })
            done();
        })

        it("It should get a single random movie that has a runtime between <duration - 10> and <duration + 10>", (done) => {
            let movie = {};
            chai.request(server)
            .get('/api/movies?duration=130')
            .end((err,response) => {
                response.should.have.status(200);
                response.body.movies.should.be.a('array')
                parseInt(response.body.movies[0].runtime).should.be.within(120, 140);
                movie = response.body.movies;
            })
            chai.request(server)
            .get('/api/movies?duration=130')
            .end((err,response) => {
                response.should.have.status(200);
                response.body.movies.should.be.a('array')
                parseInt(response.body.movies[0].runtime).should.be.within(120, 140);
                response.body.movies.should.not.eq(movie);
            })
            done();    
        })

       it("It should return all movies that contain at least one of the specified genres. Also movies should be ordered by a number of genres that match.", (done) => {
            chai.request(server)
            .get('/api/movies?genres=Family&genres=Fantasy')
            .end((err,response) => {
                response.should.have.status(200);
                response.body.movies.should.be.a('array')
                response.body.movies.forEach((movie) => { 
                    movie.genres.should.include.oneOf(["Family","Fantasy"]);
                })
                response.body.movies[0].genres.should.include("Family");
                response.body.movies[0].genres.should.include("Fantasy");
                response.body.movies[response.body.movies.length-1].genres.should.not.include("Family");
                response.body.movies[response.body.movies.length-1].genres.should.include("Fantasy");
            })
            done();
        }) 

        it("It should return only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>", (done) => {
            chai.request(server)
            .get('/api/movies?genres=Family&genres=Fantasy&duration=130')
            .end((err,response) => {
                let runtime = [];
                response.should.have.status(200);
                response.body.movies.forEach((movie) => { 
                    parseInt(movie.runtime).should.be.within(120, 140); 
                    movie.genres.should.include.oneOf(["Family","Fantasy"]);
                })
            })
            done();
        })

    });



    //Test the POST route
    describe('POST /api/movies', () => {
        it("It should create a new movie and return the full movie", (done) => {
            const movie = {
                "title": "Testing",
                "year": 2014,
                "genres": ["Animation","Music"],
                "runtime": 130,
                "director":"Alan Walker",
                "actors": "Frank Walsh, Emily Test, Billy Neill",
                "plot": "Testing the API",
                "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
            };
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .end((err,response) => {
                response.should.have.status(201);
                response.body.movies.should.have.property('id')
                response.body.movies.should.have.property('title').eq('Testing')
                response.body.movies.should.have.property('year').eq(2014)
                response.body.movies.genres.should.be.a('array')
                response.body.movies.genres[0].should.eq('Animation')
                response.body.movies.genres[1].should.eq('Music')
                response.body.movies.should.have.property('runtime').eq(130)
                response.body.movies.should.have.property('director').eq('Alan Walker')
                response.body.movies.should.have.property('actors').eq("Frank Walsh, Emily Test, Billy Neill")
                response.body.movies.should.have.property('plot').eq("Testing the API")
                response.body.movies.should.have.property('posterUrl').eq("https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg")
            })
            done();
        })

        it("It should return a status 400 (bad request) and error message related to genres", (done) => {
            const movie = {
                "title": "Testing",
                "year": 2014,
                "genres": ["Test","Music"],
                "runtime": 130,
                "director":"Alan Walker",
                "actors": "Frank Walsh, Emily Test, Billy Neill",
                "plot": "Testing the API",
                "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
            };
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .end((err,response) => {
                response.should.have.status(400);
                response.body.error.should.contain("genres");
            })
            done();
        })


        
        it("It should return a status 400 (bad request) and error message related to runtime", (done) => {
            const movie = {
                "title": "Testing",
                "year": 2014,
                "genres": ["Animation","Music"],
                "runtime": "test",
                "director":"Alan Walker",
                "actors": "Frank Walsh, Emily Test, Billy Neill",
                "plot": "Testing the API",
                "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
            };
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .end((err,response) => {
                response.should.have.status(400);
                response.body.error.should.contain("runtime");
            })
            done();
        })


                
        it("It should return a status 404", (done) => {
            const movie = {
                "title": "Testing",
                "year": 2014,
                "genres": ["Animation","Music"],
                "runtime": 140,
                "director":"Alan Walker",
                "actors": "Frank Walsh, Emily Test, Billy Neill",
                "plot": "Testing the API",
                "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
            };
            chai.request(server)
            .post('/movies')
            .send(movie)
            .end((err,response) => {
                response.should.have.status(404);
            })
            done();
        })

    });


})


