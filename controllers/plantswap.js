const PlantPost = require('../models/plantPost');
const Plant = require('../models/plant');
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
const fetch = require('node-fetch');
const { getNodeText } = require('@testing-library/react');

module.exports = {
    create,
    index
}

async function trefleCall(plant){
        // try{
        //     //API Call
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const treflePlantUrl = `https://trefle.io/api/v1/plants/${plant}?token=nGl9aJhLyHSPDXgy_7THrf3UycmVNDpcU4kvluaWwZQ`;

        let plantData = {};
        
            console.log(plant, "<------- data from controller")
            const response = await fetch(treflePlantUrl);
            const json = await response.json();
            console.log(json, "json from controller");
            // let selectedPlantData = json.data.main_species
            // console.log(selectedPlantData, "json.data.main_species")
            // selectedPlantData = selectedPlantData.data.main_species
            try{
                plantData={
                    commonName: (json.data.main_species.common_name ? json.data.main_species.common_name: "nothing"),
                    genus: json.data.main_species.genus,
                    species: json.data.main_species.scientific_name,
                    description: `From the family ${json.data.main_species.family} ${json.data.main_species.family_common_name ? json.data.main_species.family_common_name : '' }. Observed as a native species from ${json.data.main_species.observations}.`,
                    photoUrl: json.data.main_species.image_url
            }
            console.log(plantData);
            } catch(err){
                console.log(err)
                res.json({data: err})
            }
            
          
    return(plantData);
}


// We have to use AWS and multer again for this
async function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    const plantData = await trefleCall(req.body.plant);
    const plant = await Plant.create(plantData);
    try {

        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: 'travelgo', Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
           
            
          
            // data.Location is the address where our image is stored on aws
            const post = await PlantPost.create({description: req.body.description, quantity: req.body.quantity,
            dateCollected: req.body.dateCollected, user: req.user, photoUrl: data.Location,
            isSeed: req.body.isSeed, isRootstock: req.body.isRootstock, forSale: req.body.forSale, plant: plant._id
            });
                
            const plantPopulatedPost = await post.populate('plant').execPopulate();
            const populatedUserPost = await plantPopulatedPost.populate('user').execPopulate();
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


