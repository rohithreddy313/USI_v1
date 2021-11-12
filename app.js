const express = require('express');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const passport = require('passport');
const localStrategy = require('passport-local');
const data = require('./seeds/studentData')
const session = require('express-session')
const {isLoggedIn} = require('./middleware')
const expressError = require('./utils/expressError')
const nodemailer = require('nodemailer')

const Student = require('./models/student')
const Course = require('./models/course')

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate)


mongoose.connect('mongodb+srv://rohithreddy313:rohithreddy@cluster0.bcdx4.mongodb.net/usi?retryWrites=true&w=majority', {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true})
    .then(()=>{
        console.log('db connected')
    })
    .catch((error)=>{
        console.log('error',error)
    })

app.use(session({
    secret:'thisisasecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Student.authenticate()));

passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser()); 



const random = Math.floor(Math.random()*6) + 1

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get('/',(req,res)=>{
    var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    res.render('pages/home',{m})
})

app.post('/',async(req,res)=>{
    const {email} = req.body
    console.log(req.body.email)
    const transporter = nodemailer.createTransport({
        service:'hotmail',
        auth:{
            user:'rohithreddychalla313@outlook.com',
            pass:'rohithreddy@313'
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
    const option = {
        from:'rohithreddychalla313@outlook.com',
        to:email,
        subject:'USI Newsletter',
        text:'wow! it really works!',
        html:`<h1>Thank You! for subscribing to University of South India monthly newsletter</h1>
              <h2>You will be updated more about what's happening in the University of South India circle</h2>
              <h3 style="text-align:right">From USI dean,</h3>
              <p style="text-align:right">Rohith Reddy Challa</p>`
    }
    
    transporter.sendMail(option,function(err,info){
        if(err){
            console.log(err)
            return;
        }
        console.log('sent: '+ info.response)    
        res.redirect('/')
    })
})

app.get('/course',(req,res)=>{
    res.render('pages/course')
})

app.get('/campus',(req,res)=>{
    res.render('pages/campus')
})

app.get('/login',(req,res)=>{
    res.render('pages/login')
})

app.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),async(req,res)=>{
    const {username} = req.body;
    const student = await Student.findByUsername(username)
    res.redirect('/show')
})

app.get('/register',async(req,res)=>{
    res.render('pages/register')
})

app.post('/register',async(req,res,next)=>{
    try {
        const {email,username,password,course} = req.body;
        const student = new Student({email,username,course,attendance:data[random].attendance,tution:`${data[random].tution}`});
        const registeredStudent = await Student.register(student,password);
        req.login(registeredStudent,err=>{
            if(err) return next(err);
            res.redirect('/')
        })
    }
    catch(e){
        console.log(e);
        res.redirect('register')
    }
})

app.get('/logout',async(req,res)=>{
    req.logout();
    res.redirect('/')
})

app.get('/show',isLoggedIn,async(req,res)=>{
    const student = await Student.findByUsername(req.user.username)
    res.render('pages/show',{student})
})

app.get('/application',async(req,res)=>{
    res.render('pages/application')
})

app.post('/application',async(req,res)=>{
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service:'hotmail',
        auth:{
            user:'UniversityofSouthIndia@outlook.com',
            pass:'Usindia@313'
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
    const option = {
        from:'UniversityofSouthIndia@outlook.com',
        to:req.body.email,
        subject:'USI Newsletter',
        text:'wow! it is nice to see that you are intrested in joining USI!',
        html:`<h1>You have successfully submitted the form.</h1>
              <p>${req.body.first} ${req.body.last}, Thank You for your intrest in ${req.body.course} in USI. We will update you with further datails and process.</p>`
    }
    
    transporter.sendMail(option,function(err,info){
        if(err){
            console.log(err)
            return;
        }
        console.log('sent: '+ info.response)    
        res.redirect('/thankyou')
    })
})

app.get('/thankyou',(req,res)=>{
    res.render('pages/thankyou')
})

app.get('/campus/events',(req,res)=>{
    res.render('campuslife/events')
})
app.get('/campus/art',(req,res)=>{
    res.render('campuslife/art')
})
app.get('/campus/athletics',(req,res)=>{
    res.render('campuslife/athletics')
})
app.get('/campus/campuslife',(req,res)=>{
    res.render('campuslife/campuslife.ejs')
})
app.get('/campus/academic',(req,res)=>{
    res.render('campuslife/academic')
})

app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err,statusCode})
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('server started')
})