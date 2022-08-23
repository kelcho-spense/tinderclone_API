const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CardSchema = require('./CardsModel');
const Cors = require('cors');

//App config
require('dotenv').config();
const port = process.env.PORT || 8001;
console.log(process.env);
//Middlewares
app.use(express.json());
app.use(Cors());

//Db config
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("connected to mongodb"))
.catch((err) =>console.log(err));
//API Endpoints
app.get('/', (req, res) => res.status(200).send("heey tinderclone backend"));
//create a new card
app.post('/tinder/cards/', (req, res) => {
    const dbcard = req.body;
    CardSchema.create(dbcard,(err,data)=>{
        if(err){
            res.status(500).send("Error creating card" + err);
        }else{
            res.status(201).send(data);
        }
    });
});
// fetch the card data
app.get('/tinder/cards/', (req, res) => {
    const dbcard = req.body;
    CardSchema.find((err,data)=>{
        if(err){
            res.status(500).send("Error creating card" + err);
        }else{
            res.status(200).send(data);
        }
    });
});

//Listener
app.listen(port,() => console.log('server listening on port ' + port));

