const jwt = require('jsonwebtoken')
const taskmodel = require('../models/taskmodel')
const validator = require('../utilities/validator')

const authenticate = async (req,res,next)=>{
    try {
        
       let token = req.headers['x-api-token']

       if(!token){
        res.status(400).send({
            status :false,
            message : 'Token Not present in the Header'
        })
       }

       const Decodetoken = jwt.verify(token,'Popinzs')

       if(!Decodetoken){
        res.status(403).send({
            status:false,
            message : 'You are trying to Access someones Account'
        })
       }

       if(Date.now()  > Decodetoken.exp * 1000){
        res.status(400).send({
            status : false,
            msg : "Session Expired"
        })
    }


       req.Decodetoken =  Decodetoken
       next()
    } catch (error) {
        res.status(400).send({
            status : false,
            message : error.message
        })
    }
}


const Authorize =  async (req,res,next)=>{
    try{

    let userId = req.params.userId

    if(!validator.isValidBody(userId)){
        res.status(400).send({
            status:false,
            message : 'request Params is empty'
        })
    }

    const findUserId = await taskmodel.findOne({userId : userId})


    if(findUserId.userId != req.Decodetoken.userId){
        res.status(403).send({
            status : false,
            message : 'You cant modify other users account',

        })
    }
    next()
    }catch(error){
        res.status(400).send({
            status : false,
            message : error.message
        })
    }
}


const validateCreatetask = async (req,res,next)=>{
    try {
   
    let userId = req.body.userId

    if(userId != req.Decodetoken.userId){
        res.status(400).send({
            status :false,
            message : 'you are trying to create user from another account'
        })
    }
    next()
  
    
} catch (error) {
       res.status(400).send({
        status : false,
        message : error.message
       }) 
}
}


module.exports.authenticate =authenticate
module.exports.Authorize = Authorize
module.exports.validateCreatetask = validateCreatetask