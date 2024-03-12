const usermodel = require('../models/usermodel');
const taskmodel = require('../models/taskmodel');
const validator = require('../utilities/validator')

//creating task
const createtask = async (req,res) => {
    try {
        
        const requestbody = {...req.body}

        if(!validator.isValidBody(requestbody)){
            return res.status(400).send({
                status : false,
                message : 'Request body is Empty'
            })
         }

         let { userId, title, description, dueDate, completed } = requestbody;
         
         if(!validator.isValidInputValue(userId)){
            return res.status(400).send({
                status : false,
                message : 'userId is required like : 65efc69e629b840f7d539bc1'
            })
          }

          if(!validator.isValidInputValue(title)){
            return res.status(400).send({
                status : false,
                message : 'title is required like : Assignment'
            })
          }

          if(!validator.isValidInputValue(description)){
            return res.status(400).send({
                status : false,
                message : 'description is required like : Assignment for node is done'
            })
          }

          if(!validator.isValidInputValue(dueDate)){
            return res.status(400).send({
                status : false,
                message : 'dueDate is required like : 2024-03-12T03:06:06.906Z'
            })
          }


        if(Object.keys(requestbody).length>0){
      
       
       let userId = requestbody.userId
       const checkUserexists = await usermodel.findById(userId)
       //console.log (checkAuthorexists)

       if(checkUserexists) {
        const taskdata = await taskmodel.create(requestbody)
      
        res.status(200).send({
            status: true,
            msg : "task created successfully",
            data : taskdata
        })

       }else {
        res.status(400).send({
            status: false,
            msg : 'UserId Does not exists'
        })
       }
    }

    } catch (error) {
        
        res.status(400).send({
            status: false,
            msg : error.message
        })
    }
}


//get all created task

const alltask = async (req,res) =>{

    try {
         let findtask = await taskmodel.find({"completed" :  true})
   
          
         if(findtask!=0){
           
          return  res.status(200).send({
                status : true,
                msg : findtask
            })
         }else {
            return res.status(400).send({
                status : false, 
                msg  : "task not exists"
            })
        }
    } catch (error) {
        return res.status(400).send({
        status: false,
        msg : error.message
    })
     }
     
}

//getting task details by filter in Query params.

const gettask = async (req,res) =>{
    try{
      


         //using distructor property to segregate the Name in Query params
        let {userId, title, description, dueDate }  = req.query

       
        let obj = {}

        if(title != null) 
            obj.title = title
        
        if(userId != null) 
            obj.userId = userId
        
        if(description != null)
            obj.description = description
        
        if(dueDate != null) 
            obj.dueDate = dueDate
        
        const fintaskdata = await taskmodel.find(obj)
        
        //console.log(obj)
        
        if (Object.keys(fintaskdata).length > 0){
        return res.status(200).send(
            {status : true, msg :fintaskdata}
            )
        }else{
            return res.status(400).send(
                {status : false, msg :"Data does not Exists"}
                )
        }
         
    }catch(error){
        return  res.status(400).send(
            {status : false, msg :error.message}
            )
    }
}


//update the task by put
const Updatetask_put = async (req,res)=>{
    try {
        
  let requestbody  = {...req.body}
//console.log(requestbody)
  if(Object.keys(requestbody).length !=0){

  let {title, description, dueDate ,completed } = requestbody

  let userId = req.params.userId

  const findId = await taskmodel.findOne({userId: userId, completed : true })

  if(findId){

        const upadte   = await taskmodel.findByIdAndUpdate(
        findId,
        {$set : {title:title}},
        {$set : {description:description}},
        {$set : {dueDate:dueDate}},
        {$set : {completed:completed}},
        {new : true}
    ) 

return res.status(200).send({
    status: true,
    msg : upadte
})


  }else {
   return res.status(400).send({
        status : false,
        msg : "task already completed"
    })
  }
  }else {
return res.status(400).send({
    status : false,
    msg : "Request body is empty"
  })
  }
    } catch (error) {
       return  res.status(400).send({
            status : false,
            msg : error.message
        })
    }
}

 

//update the task by put

const Updatetask_patch = async (req,res)=>{
    try {   
        
  let requestbody  = {...req.body}
//console.log(requestbody)
  if(Object.keys(requestbody).length !=0){

    let userId = req.params.userId

    const findId = await taskmodel.findOne({userId: userId, completed : true })

  if(findId){
        const upadte   = await taskmodel.findByIdAndUpdate(
         findId,

        requestbody,
        {new : true}
    ) 

return res.status(200).send({
    status: true,
    msg : upadte
})


  }else {
    return res.status(400).send({
        status : false,
        msg : "task already completed"
    })
  }
  }else {
    return res.status(400).send({
    status : false,
    msg : "Request body is empty"
  })
  }
    } catch (error) {
        return res.status(400).send({
            status : false,
            msg : error.message
        })
    }
}


//delete the task by updating the flag completed to false
const deletetask = async (req,res)=>{
    try {
        //constructor
        let requestbody = {...req.body}

      //destructor
       let {completed} = requestbody

       let userId = req.params.userId
        if(Object.keys(requestbody).length != 0){
           let checkexits = await taskmodel.findOne({userId : userId, completed : true})

           if (checkexits){
              const updatedeletflag  = await taskmodel.findByIdAndUpdate(
                userId,
                //{$set : {isDeleted : isDeleted}},
                requestbody,

                {new : true}
              )
             return res.status(200).send({
                status : true,
                msg  :  updatedeletflag
              })

           }else {
            return res.status(200).send({
                status : false,
                msg  :  "Data does not exits"
              })
           }
        }
    } catch (error) {
        return res.status(200).send({
            status : false,
            msg  :  error.message
          })
    }
}

module.exports.createtask = createtask
module.exports.alltask = alltask
module.exports.gettask = gettask
module.exports.Updatetask_put = Updatetask_put
module.exports.Updatetask_patch= Updatetask_patch
module.exports.deletetask=deletetask