const mongoose = require('mongoose');
const {Schema}  = mongoose
const Student = require('./student')


courseSchema = new Schema({
    course:{
        type:String,
        enum:['cse','ece','eee','civil','mech','ocean']
    },
    student:[{
        type: Schema.Types.ObjectId,
        ref:'Student'
    }]
})

module.exports = mongoose.model('Course',courseSchema)