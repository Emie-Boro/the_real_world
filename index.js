const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

dotenv.config({path: './config/config.env'})

connectDB()

const formSchema = mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    country:{type:String,required:true}
})

const Formdata = mongoose.model('formData', formSchema)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('.hbs', exphbs.engine({
    defaultLayout:"main", extname:'.hbs'
}))
app.set('view engine', '.hbs')

// app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res) =>{
    res.render('index')
})

app.post('/', async (req,res)=>{
    
    await new Formdata({
        name:req.body.name,
        address:req.body.address,
        country:req.body.country
    }).save()

    // const output = ` 
    //     <p>Name: ${req.body.name}</p>
    //     <p>Address: ${req.body.address}</p>
    //     <p>Country: ${req.body.country}</p>
    //     <p>Occupation: ${req.body.occupation}</p>
    //     <p>Bank Name: ${req.body.bank}</p>
    //     <p>Bank Account: ${req.body.account}</p>
    //     <p>ID Number: ${req.body.idNumber}</p>
    //     <p>Sex: ${req.body.sex}</p>
    //     <p>Age: ${req.body.age}</p>
    //     <p>How much needed: ${req.body.amount}</p>
    //     <p>Formal Occupation: ${req.body.formalOccupation}</p>
    //     <p>Partnership Invested: ${req.body.partnership}</p>
    //     `
    // console.log(output)

    // var transporter = nodemailer.createTransport(smtpTransport({
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // auth: {
    //     user: 'somerealemail@gmail.com',
    //     pass: 'realpasswordforaboveaccount'
    // }
    // }));

    // var mailOptions = {
    // from: 'somerealemail@gmail.com',
    // to: 'friendsgmailacc@gmail.com',
    // subject: 'Sending Email using Node.js[nodemailer]',
    // text: 'That was easy!'
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    // if (error) {
    //     console.log(error);
    // } else {
    //     console.log('Email sent: ' + info.response);
    // }
    // });  

    res.redirect('/')
})

app.get(formUrl, async (req,res) =>{
    const formdata = await Formdata.find()

    res.json(formdata)
})
app.listen(8080, console.log('Server connected ...'))