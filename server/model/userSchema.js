const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please Provide the Username !!"]   
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
        unique : [true, "Email already Exists !!"]      
    },
    password : {
        type : String,
        required : [true, "Please Provide a Password !!"]    
    },
    mobile : {
        type : Number,
        required : [true, "Please Provide a Mobile NO. !!"],
        // validate: {
        //     validator: function(v) {
        //       return /\d{10}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        //   },
    },
    roles : {
        type : String,
        enum: ["STAFF", "HOD", "ADMIN"],
        default: "STAFF",
        required: [true, "Please Select a Role !!"]  
    },
    // gender: {
    //     type: String,
    //     required : true
    // },
    profile : {
        type :String
    },
    tokens : [      
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})


//pass hashing
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        //comfirm pass
        // this.password = bcrypt.hash(this.password, 12);
    }
    next();
});

//token generating
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const employees = mongoose.model('employees', userSchema);
module.exports = employees;