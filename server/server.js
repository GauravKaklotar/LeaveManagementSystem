//for use of => import express from 'express'
//add 'type':'module' in pckg.json
//bcs bydefault it will use commonJS that cant suppport import stment.
//all imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

//env
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

const app = express({extended: true});

//connection
require('./database/connection');

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); 

//linking of routes 
app.use('/api', require('./router/auth'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`LMS app listening on port ${PORT}!`)); 