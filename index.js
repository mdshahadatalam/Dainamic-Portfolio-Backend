require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const Navbar = require('./Model/navbarModel')
const Banner = require('./Model/Banner')
const About = require('./Model/About')
const Service = require('./Model/Service')
const Resume = require('./Model/Resume')
const Testimonial = require('./Model/Testimonial')
const Blog = require('./Model/Blog')
const Portfolio = require('./Model/Portfolio')
const nodemailer = require("nodemailer");

const multer  = require('multer')

const app = express()
const port = 3000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix+'-'+file.originalname)
  }
})

const upload = multer({ storage: storage })


mongoose.connect(`mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@cluster0.s6648.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected!')).catch((err)=> console.log(err)
  )


  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://dainamic-portfolio-backend.vercel.app", // change link
    ],
    credentials: true,
  
  };
  app.use(cors(corsOptions));



  



app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('./uploads'))

// navbar 

app.post('/navbar',upload.single("logo"),function (req, res) {
  // res.send('Hello World')
  console.log(req.body);
  let data = new Navbar({...req.body,logo:req.file.path})
  data.save()
  res.send("data received")  
  
})

app.get('/navItem', async function(req,res){
  let data = await Navbar.findOne()
  res.send(data)
  // console.log("ami data");
  
})

app.put('/navbar/:id',upload.single("logo"),function (req, res) {
  Navbar.findByIdAndUpdate(req.params.id,{...req.body,logo:req.file.path}).then(()=>{
    res.send({message:"Navbar Updated"})
  })

  console.log(req.body);
  // console.log();
})

  



// banner 

app.post('/banner', upload.single("image"),function (req, res) {
  // res.send('Hello World')
  console.log(req.body);
 try {
  let data = new Banner({...req.body,image:req.file.path})
  console.log(data);
  data.save()
  
 } catch (error) {
  console.log(error);
}
  res.send("data received")  })

app.get('/bannerItem',async function(req,res){
   let data = await Banner.findOne()
   res.send(data)
})


app.put('/banner/:id', upload.single("image"),function (req, res) {
  // res.send('Hello World')
  console.log(req.params.id);
  Banner.findByIdAndUpdate(req.params.id,{...req.body,image:req.file.path}).then(()=>{
    res.send({message:"Banner Updated"})
  })
  
})

// about section 

app.post('/about',upload.single("aboutImg"),function(req,res){
  console.log(req.body);
  let data = new About({...req.body,aboutImg:req.file.path})
  data.save()
  
  res.send("data received")
})


app.get('/aboutItem',async function(req,res) {
   let data = await About.findOne()
   res.send(data)
})


app.put('/about/:id',upload.single("aboutImg"),function(req,res){
  // console.log(req.body);
  About.findByIdAndUpdate(req.params.id,{...req.body,aboutImg:req.file.path}).then(()=>{
    res.send({message:"About Updated"})
  })
  
})


// serviec

app.post('/service',upload.single("serImg"),function(req,res) {
  //  console.log(req.body);
   let data = new Service({...req.body,serImg:req.file.path})
   data.save()
   res.send("data received")
   
})

app.get('/serviceItem', async function(req,res){

  let data = await Service.find()
  res.send(data)
  
})

app.delete('/service/:id',async function(req,res){
    let data = await  Service.findByIdAndDelete(req.params.id,req.body)
    res.send({message:"Service Deleted"})
    // console.log(req.params);
})  



app.put('/services/:id',upload.single("serImg"),function(req,res){
  // console.log(req.body);
  Service.findByIdAndUpdate(req.params.id,{...req.body,serImg:req.file.path}).then(()=>{
    res.send({message:"Services Updated"})
  })
  
})


// resume 

app.post('/resume',function(req,res){
  console.log(req.body);   
  let data = new Resume(req.body)
  data.save()
  res.send("data received")
})

app.get('/resumeItem', async function(req,res){
  let data = await Resume.find()
  res.send(data)
})


app.delete('/resume/:id', async function (req,res) {
  let data = await Resume.findByIdAndDelete(req.params.id)
  res.send({message:"Resume Deleted"})
})

app.put('/resumes/:id',function(req,res) {
  Resume.findByIdAndUpdate(req.params.id,req.body).then(()=>{
    res.send({message:"Resume Updated"})
  })
})

// testimonial 

app.post('/testimonial',upload.single("tesImg"),function(req,res){
  console.log(req.body);
  let data = new Testimonial({...req.body,tesImg:req.file.path})
  data.save()
  res.send("data received")
})


app.get('/testimonialItem', async function(req,res){
  let data = await Testimonial.find()
  res.send(data)
})


app.delete('/testimonial/:id', async function (req,res) {
   let data = await Testimonial.findByIdAndDelete(req.params.id)
  res.send('testimonial delete')
})

app.put('/testimonials/:id',upload.single("tesImg"),function (req,res) {
  Testimonial.findByIdAndUpdate(req.params.id,{...req.body,tesImg:req.file.path}).then(()=>{
    res.send({message:"testimonial Updated"})
  })
  
})


// Blogs

app.post('/blog',upload.single("blogImg"),function(req,res){
  console.log(req.body);
  let data = new Blog({...req.body,blogImg:req.file.path})
  data.save()
  res.send("Blog send")
})


app.get('/blogItem', async function (req,res) {
  let data = await Blog.find()
  res.send(data)
})

app.delete('/blogs/:id', async function (req,res) {
   let data = await Blog.findByIdAndDelete(req.params.id,req.body)
   res.send('Blog delete')
})

app.put('/blog/:id',upload.single("blogImg"),function(req,res) {
  Blog.findByIdAndUpdate(req.params.id,{...req.body,blogImg:req.file.path}).then(()=>{
    res.send("blog updated")
  })
})

//  portfolio 

app.post('/portfolio',upload.single("portImg"),function(req,res){
  let data = new Portfolio({...req.body,portImg:req.file.path})
  data.save()
  res.send("Portfolio send")
})

app.get('/portItem',async function(req,res){
  let data = await Portfolio.find()
  res.send(data)
  
})

app.delete('/portfolios/:id', async function(req,res){
  let data = await Portfolio.findByIdAndDelete(req.params.id,req.body)
  res.send('Portfolio delete')
})

// contact 

app.post('/emailSend',async function(req,res){
  console.log(req.body);
  res.send("Email Send")
  const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "process.env.REACT_APP_MENAM",
      pass: "process.env.REACT_APP_PASSWORDS",
    },
  });

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject:req.body.subject, // Subject line
    html: ` <b>Name:</b>${req.body.name}
            <b>Email:</b>${req.body.email}
            <b>Phone:</b>${req.body.phone}
            <b>Message:</b>${req.body.message}
            `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  
  
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// mdshahedalam20
// 10110999md

