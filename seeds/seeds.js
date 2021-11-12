const mongoose = require('mongoose');
const Student = require('../models/student')
const Course = require('../models/course')
const seedhelpers = require('./seedHelpers');

mongoose.connect('mongodb+srv://rohithreddy313:rohithreddy@cluster0.bcdx4.mongodb.net/usi?retryWrites=true&w=majority', {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true})
    .then(()=>{
        console.log('db connected')
    })
    .catch(()=>{
        console.log('error')
    })



// 
const seedDB = async()=>{
    await Student.insertMany(seedhelpers)

    const student = await Student.find({course:'civil'})
    
    // console.log(student)
    for(i=0;i<student.length;i++){
        const course  = await Course.findOne({course:'civil'})
        course.student.push(student[i])
        await course.save();
    }
    
    
}  

seedDB().then(course=>{
    mongoose.connection.close()
     })


