const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp : {
        type : String,
        required : [true, "Please Provide the otp !!"]   
    },
    email : {
        type : String,
        required : [true, "Please Provide a Email !!"],
        validate: {
            validator: function (v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (prop) => `Invalid Email Address: ${prop.value}`,
        },    
    },
    otpExpires : {
        type: Number,
        default: Date.now() + 120000, //2 min
        required: true,
    },
    otpUsed : {
        type : Number,
        default : 0,
        required : true
    }
})

const otpModel = mongoose.model('OTP', otpSchema);
module.exports = otpModel;