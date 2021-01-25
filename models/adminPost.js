const mongoose = require('mongoose');


const adminPostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    title: String,
    body: String,
    date: Date
  })
 

module.exports = mongoose.model('AdminPost', adminPostSchema);