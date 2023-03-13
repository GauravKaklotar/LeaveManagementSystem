const {mongoose, Schema} = require("mongoose");

const leaveSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        required: true,
    },
    leaveType: {
        type: Schema.Types.ObjectId,
        ref: "leaveType",
        required: true,
    },
    leaveDetails: {
        type: String,
        required: true,
    },
    leaveStartDate: {
        type: String,
        default: Date.now.toString(),
        required: true,
    },
    // leaveEndDate: {
    //     type: Date,
    //     default: Date.now,
    // },
    numOfDays: {
        type: Number,
        required: true,
    },
    adminRemark: {
        type: String,
        default: "",
    },
    hodRemark: {
        type: String,
        default: "",
    },
    adminStatus: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"],
        default: "Pending",
    },
    hodStatus: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"],
        default: "Pending",
    },
});

const leaveModel = mongoose.model("leave", leaveSchema);
module.exports = leaveModel;
