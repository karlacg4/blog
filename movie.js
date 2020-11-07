const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    description: String
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;