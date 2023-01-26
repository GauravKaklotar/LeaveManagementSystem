const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config({path:'./config.env'});  
require('./database/connection');

app.use(express.json());
//linking of router
app.use(require('./router/auth'));
const PORT = process.env.PORT;
    
const middleware = (req, res, next) =>{
    console.log("middleware");
    next();
}

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`)); 