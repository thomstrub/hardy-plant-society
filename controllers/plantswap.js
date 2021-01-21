const PlantPost = require('../models/plantPost');
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
const fetch = require('node-fetch');

module.exports = {
    create,
    index
}

async function trefleCall(data){
        // try{
        //     //API Call
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const treflePlantUrl = `https://trefle.io/api/v1/plants/${data}?token=nGl9aJhLyHSPDXgy_7THrf3UycmVNDpcU4kvluaWwZQ`;
        // await fetch(proxyurl + treflePlantUrl)
        //         .then((res) => res.json())
        //         .then((data) => {
        //             console.log(data.data.main_species, "json data from selected plant");
        //                 const selectedPlantData = data.data.main_species;
        //                 const plantData={
        //                         commonName: (selectedPlantData.common_name ? selectedPlantData.common_name: "nothing"),
        //                         genus: selectedPlantData.genus,
        //                         species: selectedPlantData.scientific_name,
        //                         description: `From the family ${selectedPlantData.family} ${selectedPlantData.family_common_name ? selectedPlantData.family_common_name : '' }. Observed as a native species from ${selectedPlantData.observations}.`,
        //                         photoUrl: selectedPlantData.image_url
        //                 }
        //         })
        //         return(plantData);
        // } catch(err){
        //     console.log(err)
        // }
        (async () => {
            console.log(data, "<------- data from controller")
            const response = await fetch(treflePlantUrl);
            const json = await response.json();
            console.log(json.data.main_species, "json from controller - main species");
          })();
    
}


// We have to use AWS and multer again for this
function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)

    const plantData = trefleCall(req.body.plant);
    try {

        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: 'travelgo', Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
           

          
            // data.Location is the address where our image is stored on aws
            const post = await PlantPost.create({description: req.body.description, quantity: req.body.quantity,
            dateCollected: req.body.dateCollected, user: req.user, photoUrl: data.Location,
            isSeed: req.body.isSeed, isRootstock: req.body.isRootstock, forSale: req.body.forSale, plant: plantData
            });
                console.log(selectedPlantData, "Selected Plant Data")

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


// builds plant data for database from selected plant
//   // Plant Specific API Call
//   useEffect(() => {
//     console.log(selectState, "<-----selectData")
//     const treflePlantUrl = `https://trefle.io/api/v1/plants/${selectState}?token=nGl9aJhLyHSPDXgy_7THrf3UycmVNDpcU4kvluaWwZQ`;
//     fetch(proxyurl + treflePlantUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.data.main_species, "json data from selected plant");
//         if(!firstRender.current){
//             setSelectedPlantData(data.data.main_species);
//         }
        
//         console.log(selectedPlantData, "Selected Plant Data")
        
//       });
//     }, [selectState]);
    

//     // Problem solving... debuggin render issue
    
//         const firstRender = useRef(true);
      
//         useEffect(() => {
//             firstRender.current = false;
//           }, []);
      
        

    

//     useEffect(() => {
        
//         if(firstRender.current === false){
//             setState({
//                 ...state,
//                 plant: {
//                     commonName: (selectedPlantData.common_name ? selectedPlantData.common_name: "nothing"),
//                     genus: selectedPlantData.genus,
//                     species: selectedPlantData.scientific_name,
//                     description: `From the family ${selectedPlantData.family} ${selectedPlantData.family_common_name ? selectedPlantData.family_common_name : '' }. Observed as a native species from ${selectedPlantData.observations}.`,
//                     photoUrl: selectedPlantData.image_url
//                 }
//             })
//             console.log(state, "state from useEffect")
//         }
        
        
//     }, [selectedPlantData])