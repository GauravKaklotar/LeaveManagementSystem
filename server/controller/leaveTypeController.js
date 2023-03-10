const leaveTypeModel = require('../model/leaveTypeSchema');
const {ObjectId} = require('mongodb');

const leaveTypeCreate = async function (req, res) {
    try{
        const leaveTypeName = req.body.leaveTypeName;
        const isMatch = await leaveTypeModel.findOne({leaveTypeName : leaveTypeName});
        if(isMatch){
            res.json({error : "LeaveType already created"});
        }
        const data = req.body;
        const leaveType = new leaveTypeModel(data);
        await leaveType.save();
        res.json({message : "LeaveType created"});
    }
    catch(error){
        console.log(error);
    }

}

const allLeaveTypes = async function(req, res){
    try{
        const leaveTypes = await leaveTypeModel.find();
        if(!leaveTypes){
            res.json({error: "No leaveTypes are created"});
        }
        res.json(leaveTypes);
    }
    catch(error){
        console.log(error);
    }
}

const getLeaveType = async function(req, res){
    try{
        const id = req.params.id;
        if(!id){
            res.json({error: "cant get Id as params"});
        }
        const objId = new ObjectId(id);
        const leaveType = await leaveTypeModel.findOne({_id : objId});
        if(!leaveType){
            res.json({error: "This leaveType doen't exixts"});
        }
        else{
            res.json(leaveType);
        }
    }
    catch(error){
        console.log(error);
    }
}

const updateLeaveType = async function(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        if(!id){
            res.json({error: "cant get Id as params"});
        }
        const objId = new ObjectId(id);
        const leaveType = await leaveTypeModel.findOne({_id : objId});
        if(!leaveType){
            res.json({error: "This leaveType doen't exixts"});
        }
        else{
            await leaveTypeModel.findOneAndUpdate({_id : objId}, data, {new: true});
            res.json({message : "leaveType updated successfully"});
        }
    }
    catch(error){
        console.log(error);
    }
}

const deleteLeaveType = async function(req, res){
    try{
        const id = req.params.id;
        if(!id){
            res.json({error: "cant get Id as params"});
        }
        const objId = new ObjectId(id);
        const leaveType = await leaveTypeModel.findOne({_id : objId});
        if(!leaveType){
            res.json({error: "This leaveType doen't exixts"});
        }
        else{
            await leaveTypeModel.deleteOne({_id : objId});
            res.json({message : "leaveType deleted successfully"});
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    leaveTypeCreate,
    allLeaveTypes,
    getLeaveType,
    updateLeaveType,
    deleteLeaveType
};