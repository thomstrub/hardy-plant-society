const AdminPost = require('../models/adminPost');
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr

module.exports = {
    create,
    index,
    delete: deletePost
}

// We have to use AWS and multer again for this
async function create(req, res){
    
    try {

        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: 'travelgo', Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
            // data.Location is the address where our image is stored on aws
            const post = await AdminPost.create({user: req.user, title: req.body.title, body: req.body.body, date: req.body.date, photoUrl: data.Location});
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
        const posts = await AdminPost.find({}).populate('user').exec() 
        res.status(200).json({posts})
    } catch(err){

    }
}

async function deletePost(req, res){
    try {
        console.log("hitting delete")
        const post = await AdminPost.findOneAndDelete({'_id': req.params.id});
        res.json({data: 'post removed'})
    } catch(err){
        res.json({error: err})
    }
}