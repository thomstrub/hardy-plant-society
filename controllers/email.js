const EMAIL = process.env.EMAIL;
const TEMPLATE = process.env.TEMPLATE;


module.exports = {
   getKeys
}

async function getKeys(req, res){
     
    try {
        
        const keys = {
            email: EMAIL,
            template: TEMPLATE
        }
        console.log(keys, "keys from email ctrl")
        // when we populate the user so we don't have to worry about sending over the password!
        
        res.status(200).json(keys)
    } catch(err){

    }
}