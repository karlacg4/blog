const mongoose = require('mongoose');
const { stringify } = require('querystring');

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    description: String,
    rating: String,
    genre: String,
    language: String,
    producer: String,
    writer: String,
    releaseDate: String,
    streamingRelease: String,
    earnings: String,
    duration: String,
    company: String
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;