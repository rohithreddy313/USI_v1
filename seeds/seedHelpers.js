const data = require('./studentData')

const random = Math.floor(Math.random()*6) + 1

const seedhelpers = [
    {
        email:'rohan@gmail.com',
        username : 'hemanth',
        password:'hemanth',
        course:'ece',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'rohit@gmail.com',
        username : 'ramu',
        password:'ramu',
        course:'mech',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'rohitha@gmail.com',
        username : 'tej',
        password:'tej',
        course:'ocean',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'bhanu@gmail.com',
        username : 'bhanu',
        password:'bhanu',
        course:'civil',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'nischay@gmail.com',
        username : 'nischay',
        password:'nischay',
        course:'eee',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'madhu@gmail.com',
        username : 'madhu',
        password:'madhu',
        course:'eee',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'sai@gmail.com',
        username : 'sai',
        password:'sai',
        course:'cse',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'venkat@gmail.com',
        username : 'venkat',
        password:'venkat',
        course:'ocean',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'sanjay@gmail.com',
        username : 'sanjay',
        password:'sanjay',
        course:'ece',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'hrishi@gmail.com',
        username : 'hrishi',
        password:'hrishi',
        course:'ocean',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    },
    {
        email:'pranay@gmail.com',
        username : 'pranay',
        password:'pranay',
        course:'civil',
        attendance: data[random].attendance,
        tution: `${data[random].tution}`
    }
]

module.exports = seedhelpers