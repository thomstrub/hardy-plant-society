const mongoose = require('mongoose');


const plantSchema = new mongoose.Schema({
    commonName: String,
    genus: String,
    species: String,
    cultivar: String,
    description: String,
    photoUrl: String
  })
 

module.exports = mongoose.model('Plant', plantSchema);