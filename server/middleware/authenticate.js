const { request } = require('express');
const jwt = require('jsonwebtoken');
const employees = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwttoken;
        const verifytoken = await jwt.verify(token, process.env.SECRET_KEY);

        const rootEmployee = await employees.findById({_id : verifytoken._id, "tokens.token": token});

        if(!rootEmployee) 
        {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootEmployee = rootEmployee;
        req.employeeID = rootEmployee._id;

        next();

    }
    catch(err){
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    };
}

module.exports = authenticate;