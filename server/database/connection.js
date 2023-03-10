const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log("no connection", err);
})