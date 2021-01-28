const User = require('../models/user');
const PlantPost = require('../models/plantPost');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const KEY = process.env.KEY;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr


module.exports = {
  signup,
  signupNoPhoto,
  login,
  profile
};

// signup for users who upload a photo
function signup(req, res) {

  // FilePath unique name to be saved to our butckt
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: 'travelgo', Key: filePath, Body: req.file.buffer};
 
  s3.upload(params, async function(err, data){
    // data.Location is our photoUrl that exists on aws
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user); 
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  })
 
}

async function signupNoPhoto(req, res){
  
  const user = new User({...req.body});

    try {
      await user.save();
      const token = createJWT(user); 
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
}

async function login(req, res) {
  
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user', !user, !!user)
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res) {
  console.log("hitting profile");
  try{
    const user = await User.findOne({username: req.params.username})
    const posts = await PlantPost.find({user: user._id}).populate('user').populate('plant').exec();
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    return res.status(401).json(err)
  }
  
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
