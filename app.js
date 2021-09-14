const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = 8080;
const Notes = require("./model/Note.js")
const { update } = require('./model/Note.js')


// EXPRESS SPECIFIC STUFF

// Using ejs to reder html
app.use(express.static(path.join(__dirname, 'static')));  
app.set('view engine' , 'ejs')


//Body parser
app.use(bodyParser.urlencoded({ extended: true }))

//ENDPOINTS
//Main
app.get('/',(req,res)=>{
    res.render('index.ejs',{test:"Hello Hello"})
})

//Create note
app.post('/',(req,res)=>{
    res.render('index.ejs')
    let Note = req.body.save_note;
    Notes.create({Note})
})


var params = [];
//Send notes to frontend
app.get('/api',(req,res)=>{
        Notes.find({},(err,data)=>{
        res.json(data)
    })
})


//Update Note
app.post('/update',async (req,res)=>{
    if (req.body.updateNote != "") {
        await Notes.updateOne({"Note":req.body.prevNote}, { $set: { Note: req.body.updateNote } });
    }
    res.render('index.ejs')
})

//Mongoose connection
mongoose.connect('mongodb://localhost:27017/notes_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



//START THE SERVER
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})