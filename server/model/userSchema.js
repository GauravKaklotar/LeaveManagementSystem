const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true   
    },
    email : {
        type : String,
        required : true   
    },
    password : {
        type : String,
        required : true  
    },
    mobile : {
        type : Number,
        required : true
    },
    // gender: {
    //     type: String,
    //     required : true
    // },
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
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const employees = mongoose.model('EMPLOYEES', userSchema);
module.exports = employees;