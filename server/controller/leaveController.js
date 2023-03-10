const leaveModel = require('../model/leaveSchema');
const leaveTypeModel = require('../model/leaveTypeSchema');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const employees = require('../model/userSchema');
const {Types} = require('mongoose');

const createLeave = async function(req, res){
    try{
        const {leaveType, password, numOfDays, leaveDetails, leaveStartDate, leaveEndDate} = req.body;
        if(!leaveType || !password || !numOfDays ){
            res.json({error : "Fill all the fields"});
        }
        const isMatch = await leaveModel.findOne({userId : req.id, leaveStartDate : leaveStartDate});
        if(isMatch){
            res.json({error : "Leave request on this day is already created"});
        }
        else{
            const leaveTypeData = await leaveTypeModel.findOne({leaveTypeName : leaveType});
            if(!leaveTypeData || !leaveTypeData.leaveTypeStatus){
                res.json({error : "You cannot use this Leave type"});
            }
            else{
                const isPass = await bcrypt.compare(password, req.password);
                if(!isPass){
                    res.json({error : "Enter correct Password"});
                }
                let hod = "Pending";
                if(req.roles === "HOD"){
                    hod = "Approved";
                }
                else{
                    // const leaveEndDate = new Date(leaveStartDate.getTime() + (numOfDays * 24 * 60 * 60 * 1000));
                    const leave = new leaveModel({
                        userId : req.id,
                        leaveType : leaveTypeData._id,
                        leaveDetails : leaveDetails,
                        leaveStartDate : leaveStartDate,
                        leaveEndDate : leaveEndDate,
                        numOfDays : numOfDays,
                        hodStatus : hod
                    });
                    await leave.save();
                    res.json({message : "leave created"});
                    // console.log("leave created");
                }
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

const allLeaves = async function(req, res){
    try{
        const leaves = await leaveModel.find();
        if(!leaves){
            res.json({error : "No leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
}

const getLeave = async function(req, res){
    try{
        const {id} = req.params;
        if(!id){
            res.json({error : "No id provides as a params"});
        }
        const objId = new ObjectId(id);
        const leave = await leaveModel.findOne({_id : objId});
        if(!leave){
            res.json({error : "Leave doesn't exists"});
        }
        const {password, ...rest} = leave.toObject();
        res.json(rest);
    }
    catch(error){
        console.log(error);
    }
}

const updateLeave = async function(req, res){
    try{
        const {id} = req.params;
        if(!id){
            res.json({error : "Leave doesn't exists"});
        }
        const leave = await leaveModel.findOne({_id : id});
        if(!leave){
            res.json({error : "Leave doesn't exists"});
        }
        if(leave.hodStatus === "Pending"){
            //for leaveType
            //If you try to save the document with a string value in a field that has been defined as an ObjectId type, Mongoose will throw a CastError. To avoid this error, you should make sure to convert the string value to an ObjectId before saving the document.
            const {leaveStartDate,leaveType, password} = req.body;
            if(leaveType){
                const leaveTypeData = await leaveTypeModel.findOne({leaveTypeName : leaveType});
                if(!leaveTypeData || !leaveTypeData.leaveTypeStatus){
                    res.json({error : "You cannot use this Leave type"});
                }
            }
            if(leaveStartDate){
                const isMatch = await leaveModel.findOne({userId : req.id, leaveStartDate : leaveStartDate});
                if(isMatch){
                    res.json({error : "Leave request on this day is already created"});
                }
            }
            if(!password){
                res.json({error : "Please provide a password to update a leave"});
            }
            else{
                const isPass = await bcrypt.compare(password, req.password);
                if(!isPass){
                    res.json({error : "Please provide a correct password to update a leave"});
                }
                else{
                    const {password, leaveType, leaveStartDate, leaveEndDate, numOfDays, leaveDetails} = req.body;
                    await leaveModel.updateOne({_id : id}, { 
                        $set : {
                            leaveType : Types.ObjectId(leaveType._id),
                            leaveStartDate : leaveStartDate,
                            leaveEndDate : leaveEndDate,
                            numOfDays : numOfDays,
                            leaveDetails : leaveDetails
                        }
                    }, {new : true});
                    res.json({message : "Leave Updated Successfully"});
                }
            }
        }
        else{
            res.json({error : "Can't update a Leave as its Approved as one or more stage"});
        }
    }
    catch(error){
        console.log(error);
    }
}

const updateLeaveByHod = async function(req, res){
    try{
        const {id} = req.params;
        if(!id){
            res.json({error : "Leave doesn't exists"});
        }
        const leave = await leaveModel.findOne({_id : id});
        if(!leave){
            res.json({error : "Leave doesn't exists"});
        }
        if(leave.adminStatus === "Pending"){
            //for leaveType
            //If you try to save the document with a string value in a field that has been defined as an ObjectId type, Mongoose will throw a CastError. To avoid this error, you should make sure to convert the string value to an ObjectId before saving the document.
            const {leaveStartDate,leaveType, password} = req.body;
            if(leaveType){
                const leaveTypeData = await leaveTypeModel.findOne({leaveTypeName : leaveType});
                if(!leaveTypeData || !leaveTypeData.leaveTypeStatus){
                    res.json({error : "You cannot use this Leave type"});
                }
            }
            if(leaveStartDate){
                const isMatch = await leaveModel.findOne({userId : req.id, leaveStartDate : leaveStartDate});
                if(isMatch){
                    res.json({error : "Leave request on this day is already created"});
                }
            }
            if(!password){
                res.json({error : "Please provide a password to update a leave"});
            }
            else{
                const isPass = await bcrypt.compare(password, req.password);
                if(!isPass){
                    res.json({error : "Please provide a correct password to update a leave"});
                }
                else{
                    const {password, leaveType, leaveStartDate, leaveEndDate, numOfDays, leaveDetails} = req.body;
                    await leaveModel.updateOne({_id : id}, { 
                        $set : {
                            leaveType : Types.ObjectId(leaveType._id),
                            leaveStartDate : leaveStartDate,
                            leaveEndDate : leaveEndDate,
                            numOfDays : numOfDays,
                            leaveDetails : leaveDetails
                        }
                    }, {new : true});
                    res.json({message : "Leave Updated Successfully"});
                }
            }
        }
        else{
            res.json({error : "Can't update a Leave as its Approved as one or more stage"});
        }
    }
    catch(error){
        console.log(error);
    }
}


const pendingLeaves = async function(req, res){
    try{
        const leaves = await leaveModel.find({userId : req.id, adminStatus : "Pending"});
        if(!leaves){
            res.json({error : "No Pending Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const approvedLeaves = async function(req, res){
    try{
        const leaves = await leaveModel.find({userId : req.id, adminStatus : "Approved"});
        if(!leaves){
            res.json({error : "No Approved Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const rejectedLeaves = async function(req, res){
    try{
        const leaves = await leaveModel.find({userId : req.id, adminStatus : "Rejected"});
        if(!leaves){
            res.json({error : "No rejected Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const pendingLeavesByHod = async function(req, res){
    try{
        const leaves = await leaveModel.find({hodStatus : "Pending"});
        if(!leaves){
            res.json({error : "No pending Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const approvedLeavesByHod = async function(req, res){
    try{
        const leaves = await leaveModel.find({hodStatus : "Approved"});
        if(!leaves){
            res.json({error : "No approved Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const rejectedLeavesByHod = async function(req, res){
    try{
        const leaves = await leaveModel.find({hodStatus : "Rejected"});
        if(!leaves){
            res.json({error : "No rejected Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const updateStatusByHod = async function(req, res){
    try{
        const roles = req.roles;
        const {id} = req.params;
        if(roles === "HOD"){

            if(!id){
                res.json({error : "No id in Params"});
            }
            const {hodStatus, password, hodRemark} = req.body;
            const isPass = await bcrypt.compare(password, req.password);
            if(!isPass){
                res.json({error : "Please provide a correct password to update a leave"});
            }
            await leaveModel.findOneAndUpdate({_id : id}, {hodStatus, hodRemark}, {new : true});
            res.json({message : "Status Updated Successfully"});
        }
        else{
            res.json({error : "Only Hod is permitted to do this"});
        }
    }
    catch(error){
        console.log(error);
    }
}

const pendingLeavesByAdmin = async function(req, res){
    try{
        const leaves = await leaveModel.find({adminStatus : "Pending"});
        if(!leaves){
            res.json({error : "No pending Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const approvedLeavesByAdmin = async function(req, res){
    try{
        const leaves = await leaveModel.find({adminStatus : "Approved"});
        if(!leaves){
            res.json({error : "No approved Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const rejectedLeavesByAdmin = async function(req, res){
    try{
        const leaves = await leaveModel.find({adminStatus : "Rejected"});
        if(!leaves){
            res.json({error : "No rejected Leaves are there"});
        }
        res.json(leaves);
    }
    catch(error){
        console.log(error);
    }
} 

const updateStatusByAdmin = async function(req, res){
    try{
        const roles = req.roles;
        if(roles === "ADMIN"){

            const {id} = req.params;
            if(!id){
                res.json({error : "No id in Params"});
            }
            const {hodStatus, password, adminRemark} = req.body;
            const isPass = await bcrypt.compare(password, req.password);
            if(!isPass){
                res.json({error : "Please provide a correct password to update a leave"});
            }
            await leaveModel.findOneAndUpdate({_id : id}, {hodStatus, adminRemark}, {new : true});
            res.json({message : "Status Updated Successfully"});
        }
        else{
            res.json({error :"Only Admin is permitted to do this"});
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    createLeave,
    allLeaves,
    getLeave,
    updateLeave,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
    updateLeaveByHod,
    pendingLeavesByHod,
    approvedLeavesByHod,
    rejectedLeavesByHod,
    updateStatusByHod,
    pendingLeavesByAdmin,
    approvedLeavesByAdmin,
    rejectedLeavesByAdmin,
    updateStatusByAdmin
}