const mongoose = require('mongoose');
const validator = require('../utilities/validator')

const usermodel = new mongoose.Schema(
    {
            fname: {
                type : String,
                required : [true,'Fname is mantatory']

            },
            lname: {
                type : String,
                required : [true,'Lname is mantatory']
            },
            email: {
                type : String,
                required : [true, 'Email is Mantatory'],
                validate  : [validator.isvalidEmail, 'Enter a valid Email'],
                unique : [true, 'Email should be Unique']
            },
            phone: {
                type : String,
                required : [true, 'Phonr NO is mantatory'],
                unique : [true, 'Mobile number should be Unique'],
                validate : [validator.isValidPhone, 'Enter a valid phone No']
            }, 
            password: {
                type :String,
                Required : [true, 'Password is mantatory'],
                minLen : [8, 'Minimum length should  be 8'],
                maxLen : [15, 'Maximum of lenght should be 15']}, // encrypted password
            address: {
                type :  String,
                required : [true,"address is Required"]
            }
    },{timestamps : true}
)


module.exports = mongoose.model('User', usermodel)