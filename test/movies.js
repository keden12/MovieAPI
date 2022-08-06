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
                expect(parseInt(response.body.movies[0].runtime)).to.be.within(120, 140);
                movie = response.body.movies;
            })
            chai.request(server)
            .get('/api/movies?duration=130')
            .end((err,response) => {
                response.should.have.status(200);
                response.body.movies.should.be.a('array')
                expect(parseInt(response.body.movies[0].runtime)).to.be.within(120, 140);
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
                    expect(movie.genres).to.include.oneOf(["Family","Fantasy"]);
                })
                expect(response.body.movies[0].genres).to.include("Family");
                expect(response.body.movies[0].genres).to.include("Fantasy");
                expect(response.body.movies[response.body.movies.length-1].genres).to.not.include("Family");
                expect(response.body.movies[response.body.movies.length-1].genres).to.include("Fantasy");
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
                    expect(parseInt(movie.runtime)).to.be.within(120, 140); 
                    expect(movie.genres).to.include.oneOf(["Family","Fantasy"]);
                })
            })
            done();
        })

    });



    //Test the POST route



})


