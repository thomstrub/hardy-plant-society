const PlantPost = require('../models/plantPost');
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr

module.exports = {
    create,
    index
}
// We have to use AWS and multer again for this
function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: 'travelgo', Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
                // data.Location is the address where our image is stored on aws
            const post = await PlantPost.create({description: req.body.description, quantity: req.body.quantity,
                 dateCollected: req.body.dateCollected, user: req.user, photoUrl: data.Location});
            const populatedUserPost = await post.populate('user').execPopulate();
            res.status(201).json({post: populatedUserPost})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}


async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const posts = await PlantPost.find({}).populate('user').exec() // userSchema.set('toObject') gets invoked, to delete the password
        // when we populate the user so we don't have to worry about sending over the password!
        res.status(200).json({posts})
    } catch(err){

    }
}