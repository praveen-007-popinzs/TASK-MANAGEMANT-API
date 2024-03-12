const usermodel  = require('../models/usermodel');
const validator = require('../utilities/validator')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const bcrypt = require('bcrypt')


const Createuser = async (req,res)=>{
    try {

        const requestbody = {...req.body}


     if(!validator.isValidBody(requestbody)){
        return res.status(400).send({
            status : false,
            message : 'Request body is Empty'
        })
     }
      let { fname, lname, email, phone, password, address } = requestbody;
   
      if(!validator.isValidInputValue(fname)){
        return res.status(400).send({
            status : false,
            message : 'Fname is required like : Praveen'
        })
      }

      if(!validator.IsvalidOnlyCharacter(fname)){
        return res.status(400).send({
            status : false,
            message : 'Fname is should be in alphabet'
        })
      }


      if(!validator.isValidInputValue(lname)){
        return res.status(400).send({
            status : false,
            message : 'lname is required like : Kumar'
        })
      }

      if(!validator.IsvalidOnlyCharacter(lname)){
        return res.status(400).send({
            status : false,
            message : 'lname is should be in alphabet'
        })
      }

      if(!validator.isValidInputValue(email)){
        return res.status(400).send({
            status : false,
            message : 'email is required like : praveen23@gmail.com'
        })
      }

      if(!validator.isvalidEmail(email)){
        return res.status(400).send({
            status : false,
            message : 'email should be valid like : praveen23@gmail.com'
        })
      }
     
    if(!validator.IsvalidOnlyNumber(phone)){
        return res.status(400).send({
            status : false,
            message : 'Phone number should be in Number'
        })
    }

    if(!validator.isValidPhone(phone)){
      return  res.status(400).send({
            status : false,
            message   : 'Phone Number is required like : 1234567890'
        })
    }

    if(!validator.isValidInputValue(password)){
        return res.status(400).send({
            status : false,
            message : 'password is required like : Papp@122'
        })
      }

    if(!validator.isValidPassword(password)){
        return res.status(400).send({
            status : false,
            message : 'password should be between of 8 to 15 character'
        })
      }
      
    if(!validator.isValidInputValue(address)){
        return res.status(400).send({
            status : false,
            message  : 'Address is required'
        })
    }  
    


    const salt = await bcrypt.genSalt(10)

    const encryptedpassword = await bcrypt.hash(password,salt)

    const UserData = {
            fname: fname.trim(),
            lname: lname.trim(),
            email: email.trim(),
            phone: phone,
            password: encryptedpassword,
            address: address,
    }

const Createuser = await usermodel.create(UserData)    

   res.status(200).send({
    status : true,
    message : Createuser
   })

    } catch (error) {
        return res.status(400).send({
            status : false,
            error : error.message
        })
    }
}

//user login
const UserLogin = async (req,res)=>{
    try {
        //constructor Property
        let body = {...req.body}

        //Body starts
        if(!validator.isValidBody(body)){
          return  res.status(400).send({
                status : false,
                message : 'Request Body is Empty'
            })
        }
        //body ends
 
      //destructor property  
      let {email, password} = body

       //email starts
     if(!validator.isValidInputValue(email)){
        return  res.status(400).send({
            status : false,
            message : 'Enter a valid email like : qwe@gmail.com'
        })
     }


     if(!validator.isvalidEmail(email)){
        return res.status(400).send({
            status : false,
            message : 'Enter a valid email like : qwe@gmail.com'
        })
     }
       //email ends

       //password starts
      if(!validator.isValidInputValue(password)){
        return  res.status(400).send({
            status : false,
            message : 'Enter a valid pasword like :123@qwer'
        })
      }

      if(!validator.isValidPassword(password)){
        return  res.status(400).send({
            status : false,
            message : 'Enter a valid pasword like :123@qwer'
        })
      }
       //password ends

       const FindLoginData = await usermodel.findOne({email : email})

       console.log(FindLoginData)

       if(!FindLoginData){
        return  res.status(400).send({
            status : false,
            message : 'Data does not exists'
        })
       }
       if(FindLoginData){

        //jwt sign
      
      const token = jwt.sign(
        //payload
        {
          userId  : FindLoginData._id,
          iat : Math.floor(Date.now() /1000),
          exp : Math.floor(Date.now() / 1000) + 10*60*60
        },
        //payload
        //Secret Key
        'Popinzs'
        //Secret Key
      )

      res.setHeader("x-api-token", token)

      return res.status(200).send({
        status :true,
        message : "Author Login Successfully"   ,
        Data :   token
    })

       }


    } catch (error) {
        return res.status(400).send({
            status : false,
            message : error.message
        })
    }
}


//user logout
const UserLogout = async (req,res)=>{
    try {
        let token = req.headers['x-api-token']

        if(!token){
        return res.status(400).send({
             status :false,
             message : 'Token Not present in the Header'
         })
        }
 
        const Decodetoken = jwt.verify(token,'Popinzs')
 
 
        if(Date.now()  > Decodetoken.exp * 1000){
            return   res.status(400).send({
             status : false,
             msg : "Session Expired, you loged out"
         })
     }


    } catch (error) {
        return res.status(400).send({
            status : false,
            message : error.message
        })
    }
}
//password reset
const PasswordReset = async (req,res)=>{
    try {
        
     let email = req.params.email
     let password = req.body

     if(!validator.isValidBody(email)){
     return   res.status(400).send({
            status : false,
            message : 'Request Params is Empty'
        })
     }

     if(!validator.isValidInputValue(password)){
        return  res.status(400).send({
            status : false,
            message : 'Enter a valid pasword like :123@qwer'
        })
      }

      if(!validator.isValidPassword(password)){
        return  res.status(400).send({
            status : false,
            message : 'Enter a valid pasword like :123@qwer'
        })
      }

   const findemail = await usermodel.findOne({email : email})

   if(!findemail){
    return res.status(400).send({
        status : false,
        message : 'Email id does not exists'
    })
   }

    if(findemail){
        const salt = await bcrypt.genSalt(10)

    const encryptedpassword = await bcrypt.hash(password,salt) 

const ResetPass = await usermodel.findOneAndUpdate(
    {email : email},
    {$set : {password : encryptedpassword}},
    {new : true}
)

return res.status(201).send({
    status : true,
    message : 'Password Updated successfully',
    UpdatedData : ResetPass
})

    }



    } catch (error) {
        return   res.status(400).send({
            status : false,
            message : error.message
        })
    }
}

module.exports.Createuser = Createuser
module.exports.UserLogin = UserLogin
module.exports.UserLogout = UserLogout
module.exports.PasswordReset = PasswordReset