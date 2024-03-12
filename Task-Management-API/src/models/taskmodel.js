const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const TaskModel = new mongoose.Schema({
    userId : {
        type : ObjectId,
        required : [true, 'UserId is required'],
        ref : 'User'
    },
    
    title: {
        type : String,
        required : [true, 'title is required']
    
    },

    description: {
     type: String,
     required: [true, 'description is required'],

    },

    dueDate : {
        type : Date,
        required : [true, 'dueDate is mantatory']
    },

    completed : {
        type : Boolean,
        default : false
    }
   
},{timestamps : true}
)

module.exports=mongoose.model('user', TaskModel)