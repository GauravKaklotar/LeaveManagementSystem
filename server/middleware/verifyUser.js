const jwt = require('jsonwebtoken');
const employees = require('../model/userSchema');

const verifyUser = async (req, res, next) => {
    // const token = req.cookies.jwttoken;

    //access of authorized header 
    //header[1] means we removed "barear"prefix from header as headr[0]
    // console.log(req.headers.cookie.replace("jwttoken=", ''));
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.cookie.replace("jwttoken=", '');
    if(!token){
        res.json({Error : "Token Not Found"});
    }
    try{
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await employees.findById({_id : decoded._id, "tokens.token": token});

        if(!user){
            throw new Error("User not found !!");
        }

        req.token = token;
        req.decoded = decoded;
        req.email = user.email;
        req.id = user._id;
        req.password = user.password;
        req.roles = user.roles;
        
        console.log("user verified");

        next();
    }
    catch(err){
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
}

const verifyAdmin = async function (req, res, next) {
    const email = req.email;
    try{
        if(!email){
            res.json({error : "Please Enter valid email"});
        }
        const isMatch = await employees.findOne({email : email, roles : "ADMIN"});
        if(!isMatch){
            res.json({error : "Please Enter valid Credentials"});
        }
        else{
            req.user = isMatch;
            req.id = isMatch._id;
            req.email = isMatch.email;
            req.password = isMatch.password;
            req.roles = isMatch.roles;
            console.log("admin verified");

            next();
        }
    }
    catch(err){
        res.status(401).send('Unauthorized: ADMIN');
        console.log(err);
    }
}

module.exports = {
    verifyUser,
    verifyAdmin,
};