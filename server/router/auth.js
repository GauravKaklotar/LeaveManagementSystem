const express = require('express');
const router = express.Router();
const employees = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../database/connection');

router.get('/', (req, res) => res.send('Hello World! router'));

//reg route
router.post('/register', async (req, res)=>{
    const {username, email, password, cpassword, mobile } = req.body;
    // res.json({message : req.body}); //for thunderclient response
    //message ->db entity
    //req.body ->userfilled property

    if( !username || !email || !password || !cpassword || !mobile ){
        return res.status(422).json({error : 'plz fill the all field'});
    }
    
    try{
        // const userExist = await employees.findOne({username : username})
        const userExist = await employees.findOne({email : email})
        if(userExist){
            return res.status(422).json({error : 'email is already exist'}); 
        }
        else if( password != cpassword){
            return res.status(422).json({error : 'password and confirm password doesnot match'});
        }
        else{
            const employee = new employees({username, email, password, mobile });
            //pass hashing
            await employee.save();  
            res.status(201).json({message : "user registered successfully"});
            
            //using promise 
            // employee.findOne({email : email}) //left email = db entity, right email = userfilled entity
            // .then((userExist)=> {
            //     if(userExist){
            //         flag = true;
            //         return res.status(422).json({error : 'email is already exist'}); 
            //     }
        
            // })
        }
    }
    catch(err){
        console.log(err);
    }
})
// router.get('/signup', (req, res) => res.send('sign up World!'));

//login route
router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message : "yeh"});

    try{
        let token;
        const {email, password} = req.body;
        if( !email || !password){
            return res.status(400).json({error : "Plz fill the data"});
        }

        const employeeLogin = await employees.findOne({email: email});
        if(!employeeLogin){
            res.json({error : "No user Exist"});
            // console.log(employeeLogin);
        }
        const isMatch = await bcrypt.compare(password, employeeLogin.password);
        token = await employeeLogin.generateAuthToken();
        // console.log(token);
        res.cookie("jwttoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true //bcs otherwise its run only on secure
        });
        
        if(!isMatch){
            res.json({error : "Plz enter correct password"});
        }
        else{
            res.json({message : "User login successfully"});
        }

    }catch(err){
        console.log(err);
    }
})

module.exports = router;