const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


// dotenv.config({path: './config/config.env'})

connectDB()

const formSchema = mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    country:{type:String,required:true},
    occupation:{type:String,required:true},
    bank:{type:String,required:true},
    account:{type:String,required:true},
    IdNumber:{type:String,required:true},
    sex:{type:String,required:true},
    age:{type:String,required:true},
    formalOccupation:{type:String,required:true},
    amount:{type:String,required:true},
    partnership:{type:String,required:true},
})

const Formdata = mongoose.model('formData', formSchema)

app.use(express.static(path.join(__dirname, 'public')))

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
        country:req.body.country,
        occupation:req.body.occupation,
        bank:req.body.bank,
        account:req.body.account,
        IdNumber:req.body.IdNumber,
        sex:req.body.sex,
        age:req.body.age,
        formalOccupation:req.body.formalOccupation,
        amount:req.body.amount,
        partnership:req.body.partnership
    }).save()

    res.render('index',{
        msg:'Submitted Successfully'
    })
})

app.get(process.env.formUrl, async (req,res) =>{
    const formdata = await Formdata.find({}).lean()

    res.render('data', {formdata})
})
app.listen(8080, console.log('Server connected ...'))