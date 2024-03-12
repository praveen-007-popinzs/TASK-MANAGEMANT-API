const mongoose = require('mongoose');

const connect_mongoose = async ()=>{
     let connect =await mongoose.connect('mongodb+srv://popinzs007:Reethu007@cluster0.xyrrffh.mongodb.net/TASKDB')
     .then(()=>{
        console.log('Mongoose connected successfully')

     }).catch(err =>{
       console.log(err)
     })
}


module.exports.connect_mongoose = connect_mongoose


