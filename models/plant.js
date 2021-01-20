const mongoose = require('mongoose');


const plantSchema = new mongoose.Schema({
    genus: String,
    species: String,
    cultivar: String,
    Description: String,
    photoUrl: String
  })
 

module.exports = mongoose.model('Plant', plantSchema);