const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
    leaveTypeName : {
        type : String,
        required : [true, "Please Provide the leaveType !!"]   
    },
    leaveTypeDetails : {
        type : String,
        default : "NA"   
    },
    leaveTypeStatus : {
        type: Boolean,
        default : true
    }
})

const leaveTypeModel = mongoose.model('leaveType', leaveTypeSchema);
module.exports = leaveTypeModel;