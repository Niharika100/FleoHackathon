const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup express
const app = express();

//body parser parse the req.body data
app.use(bodyParser.json());

// connecting the server with the database
mongoose.connect('mongodb://localhost/fleo', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise

// frontend
// if a static request is sent to the server, the server will hold
// the request on express.static and doesn't bother to process other functions below that
app.use(express.static('public'))

// error handling middleware
app.use((err, req, res, next)=>{
    // console.log(err);
    res.status(422).send({error : err})
})

//listen for requests
app.listen(process.env.port || 4000, () => {
    console.log('Listening.. on port ');
});