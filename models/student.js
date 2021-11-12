const mongoose = require('mongoose');
const {Schema} = mongoose
const passportLocalMongoose = require('passport-local-mongoose');


const studentSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    course:{
        type:String,
        require:true,
        enum:['cse','ece','eee','civil','mech','ocean']
    },
    attendance:Number,
    tution:String,
    username:String,
    password:String
})

studentSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Student',studentSchema)