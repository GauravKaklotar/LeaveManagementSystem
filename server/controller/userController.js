const employees = require('../model/userSchema');
const otpModel = require('../model/otpSchema');
const bcrypt = require('bcryptjs');
// const CircularJSON = require('circular-json');
const otpGenerator = require('otp-generator');
const {ObjectId} = require('mongodb');
const sendMail = require('../controller/mailer');
const { use } = require('../router/auth');
const jwt = require('jsonwebtoken');
 
const registerUser = async (req, res) => {
    const {username, email, password, cpassword, mobile, position} = req.body;
    // res.json({message : req.body}); //for thunderclient response
    //message ->db entity
    //req.body ->userfilled property

    if( !username || !email || !password || !cpassword || !mobile ){
        return res.status(422).json({error : 'plz fill the all fields'});
    }
    
    try{
        // const userExist = await employees.findOne({username : username})
        const userExist = await employees.findOne({$or : [{email : email}, {username : username}]})
        if(userExist){
            return res.status(409).json({error : 'email or username is already exists'}); 
        }
        else if( password != cpassword){
            return res.status(422).json({error : 'password and confirm password doesnot match'});
        }
        else if(email === process.env.email){
            return res.json({error : "change the email ID as its can't be used"});
        }
        else{
            const employee = new employees({username, email, password, mobile, position });
            //pass hashing
            await employee.save();  
            res.status(201).json({message : 'user registered successfully'});
        }
    }
    catch(err){
        console.log(err);
    }
}
 
const loginUser = async (req, res) => {
    try{
        let token;
        const {email, password} = req.body;
        if( !email || !password ){
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
            expires: new Date(Date.now() + 86400000), //token expires in 24 hr
            httpOnly: true //bcs otherwise its run only on secure
        });
        
        if(!isMatch){
            res.json({error : "Plz enter correct password"});
        }
        else{
            // req.user = employeeLogin.toJSON();
            // res.json({message : "User login successfully", token});
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            const user = await employees.findById({_id : decoded._id, "tokens.token": token});
    
            if(!user){
                throw new Error("User not found !!");
            }
            req.roles = user.roles;

            const role = user.roles;
            console.log(user.roles);
            res.json({"message" : "User login successfully", role });
        }

    }catch(err){
        console.log(err);
    }
}

const logoutUser = async (req, res) => {
    try {
      const allCookies = req.headers.cookie;

    const cookies = allCookies.split("; ");
    cookies.forEach(cookie => {
      const [name, value] = cookie.split("=");
      if (name === "jwttoken") {
        res.setHeader("Set-Cookie", [
            `jwttoken=; Path=/; Max-Age=0`
          ]);
      }
    });
  
      res.json({ message: "User Log Out successfully." });
    } catch (err) {
      console.log(err);
    }
  };
  

const getRole = async (req, res) => {
    try{
      const token = req.headers.cookie.replace("jwttoken=", '');
      if(!token){
        // throw new Error("Token not found");
          res.status(200).json({Error : "Token Not Found"});
      }
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
          const user = await employees.findById({_id : decoded._id, "tokens.token": token});
  
          if(!user){
              throw new Error("User not found !!");
          }

          console.log(user.roles);
  
          let role = user.roles;
          let username = user.username;

          res.status(250).json({"message" : "Roles verified", role, username});
    }
    catch (error) {
        // res.status(401).send('Unauthorized: No token provided');
        console.log(error);
    }
  }


  

const allUsers = async (req, res) => {
    try{
        const users = await employees.find({roles : 'STAFF'});
        if(!users){
            res.json({error : "No users are there"});
        }
        res.json(users);
    }
    catch(error){
        console.log(error);
    }
}

const allUsersByHod = async (req, res) => {
    try {
      const hodPos = req.position;
      const users = await employees.find({$and : [{roles : "STAFF"}, {position : hodPos}]});
      if (!users) {
        res.json({ error: "No users are there" });
      }
      else{
        res.json(users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

const allhod = async (req, res) => {
    try{
        const users = await employees.find({roles : 'HOD'});
        if(!users){
            res.json({error : "No users are there"});
        }
        res.json(users);
    }
    catch(error){
        console.log(error);
    }
}

const getUser = async (req, res) => {
    const id = req.id;
    try{    
        if(!id){
            res.json({error : "Invalid Credentials"});
        }
        const objId = new ObjectId(id);
        const user = await employees.findOne({_id : objId});
        if(!user){
            res.json({error : "Can't Find User."});
        }
        else{
            const {password, ...rest} = user.toObject();
            res.json(rest);
        }
    }
    catch(error){
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try{    
        // const id = req.query.id;
        const userId = req.params.id;
        // const userId = req.id;
        if(userId){
            //we do not have to provide password field to update.
            const newData = req.body;
            if(!newData){ 
                res.json({error : "Data is not available"});
            }
            const {email, password} = newData;
            if(email || password){
                res.json({error : "You can't update email or password"});
            }
            const user = await employees.updateOne({_id : userId}, newData);
            if(user){
                res.json({message : "Data Updated successfully"});
            }
            else{
                res.json({error : "Can't update the Data"});
            }
        }
        else{
            res.json({error : "User Not Found"});
        }
    }
    catch(error){
        console.log(error);
    }
}

const updatePassword = async function (req, res) {
    try {
      const id = req.id;
      const { previousPassword, newPassword, confirmPassword } = req.body;
      if (!previousPassword || !newPassword || !confirmPassword) {
        res.json({ error: "Please fill all fields" });
      }
      else{
        if (previousPassword === newPassword) {
          res.json({ error: "New password cannot be same as old password" });
        }
        else{
          if(newPassword !== confirmPassword){
            res.json({ error: "New password and confirm password doesnot match" });
          }
          else{
            if (!req.password) {
              res.json({ error: "cant find req.pass" });
            }
            const isMatch = await bcrypt.compare(previousPassword, req.password);
            if (isMatch) {
              const hash = await bcrypt.hash(newPassword, 12);
              await employees.findOneAndUpdate(
                { _id: id },
                {
                  $set: { password: hash },
                },
                { new: true }
              );
              // const updatedUser = await employees.findOne({password : hash});
              // await updatedUser.save();
              res.json({ message: "password updated Successfully", hash });
            } else {
              res.json({ error: "Please enter correct current password" });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

const sendOtp = async function(req, res){
    const {email} = req.params;
    try{
        const user = await employees.findOne({email : email});
        if(!user){
            res.json({error : "User not exists."});
        }
        const otp = await otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false});
        const emailBody = `<p>Hello ${user.username} !!</br>
        Your LMS Account Recovery Code is <b>${otp}</b> </p>
        </br></br>
        Do not send to others. keep it safe and secure !!!`;
      
        const emailSubject = `Your LMS Account Recovery Code`;

        await sendMail(email, emailBody, emailSubject);

        const newOtp = new otpModel({
            otp : otp,
            email : email,
        });

        await newOtp.save();

        res.json({message : "Otp send Successful"});

    }
    catch(error){
        console.log(error);
    }
}

const verifyPassOtp = async function(req, res){
    try{
        const {otp, email} = req.params;
        const isMatch = await otpModel.findOne({$and : [{email : email, otp : otp}]});
        if(!isMatch){
            res.json({error : "Invalid Otp"});
        }

        const isUsed = await otpModel.findOne({$and : [{email : email, otp : otp, otpUsed : 0}]});
        if(!isUsed){
            res.json({error : "Otp is already Used"});
        }

        const isExpire = await otpModel.findOne({otpExpires : {$gt : Date.now()}});
        if(!isExpire){
            res.json({error : "Otp expired "});
        }

        await otpModel.updateOne({otp: otp, otpUsed : 1, new : true});

        res.json({message : "Otp verified Successfully"});
    }
    catch(error){
        console.log(error);
    }
}

const resetPassword = async function(req, res){
    try{
        const {otp} = req.params;
        const {email} = req.params;
        const {password} = req.body;

        if(!password){
            res.json({error : "Invalid Password"});
        }

        const isUsed = await otpModel.findOne({$and : [{email : email, otp : otp, otpUsed : 1}]});
        if(!isUsed){
            res.json({error : "Invalid Otp"});
        }

        const hash = await bcrypt.hash(password, 12);
        await employees.findOneAndUpdate({email : email}, {
            $set : {password : hash},
        }, {new : true})
        // await employees.updateOne({password: password, new : true});

        res.json({message : "Password Reset Successfully"});
    }
    catch(error){
        console.log(error);
    }
} 

const deleteUser = async function(req, res){
    try{
        // const email = req.email;
        const {id} = req.params;
        if(!id){
            res.json({error :"Invalid credential."});
        }
        const objId = new ObjectId(id);
        await employees.deleteOne({_id : objId});
        // await employees.deleteOne({email : email});
        res.json({message :"User deleted Successfully"});
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getRole,
    getUser,
    allUsers,
    allUsersByHod,
    allhod,
    updateUser,
    updatePassword,
    sendOtp,
    verifyPassOtp,
    resetPassword,
    deleteUser
};