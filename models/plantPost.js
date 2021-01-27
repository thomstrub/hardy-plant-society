const mongoose = require('mongoose');


const plantPostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant'},
    photoUrl: String,
    forSale: Boolean,
    isSeed: Boolean,
    isRootstock: Boolean,
    dateCollected: Date,
    quantity: Number,
    description: String,
  }, {
    timestamps: true
  })
 

module.exports = mongoose.model('PlantPost', plantPostSchema);